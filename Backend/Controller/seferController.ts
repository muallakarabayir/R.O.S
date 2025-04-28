// seferController.ts
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Sefer } from "../models/Sefer";
import { SeferLog } from "../models/SeferLog";
import { io } from "../socket";
import { recommendEarlyDeparture } from "../utils/recommendEarlyDeparture";  // Erken çıkma önerisini almak için fonksiyon
import { getTrafficData } from "../../utils/getTrafficData";  // Yolu iki üst dizine çıkarak doğru şekilde güncelledik


const router = Router();

const updateSefer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const seferRepository = AppDataSource.getRepository(Sefer);
        const logRepository = AppDataSource.getRepository(SeferLog);
        const seferId = parseInt(req.params.seferId, 10);

        const sefer = await seferRepository.findOne({ where: { id: seferId } });
        if (!sefer) {
            res.status(404).json({ error: "Sefer bulunamadı" });
            return;
        }

        // Trafik verisini alıyoruz
        const trafficData = await getTrafficData(
            { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
            { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
        );

        sefer.tahmini_sure = trafficData.duration;
        sefer.trafik_durumu = trafficData.congestion;

        // Sefer güncelleniyor
        await seferRepository.save(sefer);

        // Güncellenen verileri log tablosuna ekliyoruz
        const seferLog = logRepository.create({
            sefer,
            tahmini_sure: trafficData.duration,
            trafik_durumu: trafficData.congestion,
        });

        // Sefer log kaydını veritabanına kaydediyoruz
        await logRepository.save(seferLog);

        // Erken çıkma önerisini alıyoruz
        const earlyDepartureMessage = await recommendEarlyDeparture(sefer);  // Erken çıkma önerisi alınıyor

        io.emit("seferGuncelle", sefer);

        // Yanıt olarak erken çıkma önerisiyle birlikte sefer bilgilerini gönderiyoruz
        res.status(200).json({ message: earlyDepartureMessage, sefer });
    } catch (error) {
        next(error);
    }
};

router.get("/sefer-guncelle/:seferId", updateSefer);

export default router;

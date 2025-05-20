import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Sefer } from "../models/Sefer";
import { getGoogleRoute } from "../../utils/getRoute";
import { io } from "../socket";
import { getTrafficData } from "../../utils/getTrafficData";  // Yolu iki üst dizine çıkarak doğru şekilde güncelledik

import { SeferLog } from "../models/SeferLog";

const router = Router(); // ✅ Router() çağrısını doğru şekilde yaptığından emin ol

// Sefer güncelleme fonksiyonu
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

      const trafficData = await getTrafficData(
    { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
    { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
);

sefer.tahmini_sure = trafficData.duration;
sefer.trafik_durumu = "unknown";  // Geoapify'da congestion yok
await seferRepository.save(sefer);

const seferLog = logRepository.create({
    sefer,
    tahmini_sure: trafficData.duration,
    trafik_durumu: "unknown",  // yine sabit
});

await logRepository.save(seferLog);


        io.emit("seferGuncelle", sefer);

        res.status(200).json({ message: "Sefer güncellendi", sefer });
    } catch (error) {
        next(error);
    }
};
// Yoğun saatlerde en iyi sefer önerisi fonksiyonu
const bestSeferRecommendation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { baslangic_lat, baslangic_lng, varis_lat, varis_lng } = req.body;

        // Veritabanından trafik analiz verilerini alalım
        const logRepository = AppDataSource.getRepository(SeferLog);
        
        // Yoğun saatleri belirlemek için saat bazında ortalama süreyi alalım
        const trafficAnalysis = await logRepository.query(`
            SELECT 
                EXTRACT(HOUR FROM tarih) AS saat,
                AVG(tahmini_sure) AS ortalama_sure
            FROM sefer_log
            GROUP BY saat
            ORDER BY ortalama_sure;
        `);

        // En düşük ortalama süreyi bulan saat dilimini belirleyelim
        const bestHour = trafficAnalysis[0]?.saat; // En iyi saat (en hızlı trafik)

        // Bu saat diliminde en iyi seferi önerelim
        const seferRepository = AppDataSource.getRepository(Sefer);
        const seferler = await seferRepository.find();

        let bestSefer = null;
        let bestDuration = Infinity;

        for (const sefer of seferler) {
            // Google Maps üzerinden trafik verisi alalım
            const trafficData = await getTrafficData(
                { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
                { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
            );

            // Eğer trafik verisi, en iyi saatteki trafik yoğunluğuyla uyuyorsa
            if (trafficData.duration < bestDuration) {
                bestSefer = sefer;
                bestDuration = trafficData.duration;
            }
        }

        if (!bestSefer) {
            res.status(404).json({ message: "Yoğun saatlerde uygun sefer bulunamadı." });
        } else {
            res.status(200).json({ message: "En iyi sefer önerisi", bestSefer });
        }
    } catch (error) {
        next(error);
    }
};

// Yeni sefer ekleme fonksiyonu
const addSefer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { baslangic_lat, baslangic_lng, varis_lat, varis_lng } = req.body;

        const route = await getGoogleRoute(
            { latitude: baslangic_lat, longitude: baslangic_lng },
            { latitude: varis_lat, longitude: varis_lng }
        );

        const routeString = JSON.stringify(route);

        const seferRepository = AppDataSource.getRepository(Sefer);
        const yeniSefer = seferRepository.create({
            baslangic_lat,
            baslangic_lng,
            varis_lat,
            varis_lng,
            route: routeString,
        });

        await seferRepository.save(yeniSefer);
        io.emit("seferGuncelle", yeniSefer);

        res.status(201).json({ message: "Sefer eklendi!", yeniSefer });
    } catch (error) {
        next(error);
    }
};

// Tüm seferleri listeleme fonksiyonu
const listSeferler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const seferRepository = AppDataSource.getRepository(Sefer);
        const seferler = await seferRepository.find();
        res.status(200).json(seferler);
    } catch (error) {
        next(error);
    }
};

// ❌ Eğer `app.get(...)` veya `app.use(...)` ile tanımlıyorsan bu hataya sebep olabilir!
// ✅ Doğru kullanım:
router.get("/sefer-guncelle/:seferId", updateSefer);
router.post("/sefer-ekle", addSefer);
router.get("/seferler", listSeferler);
// Yeni rota ekleyelim: En iyi sefer önerisi
router.post("/en-iyi-sefer", bestSeferRecommendation);

export default router;

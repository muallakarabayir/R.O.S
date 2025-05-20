import 'reflect-metadata';
import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import { AppDataSource } from "./config/database";
import { Sefer } from "./models/Sefer";
import seferRouter from './routes/seferRoutes';
import { getTrafficData } from '../utils/getTrafficData';
import authRoutes from "./routes/authRoutes";
import driverRoutes from "./routes/driverRoutes";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());
//app.use('/api', seferRouter);
////app.use("/api/driver", driverRoutes);
//app.use("/api/admin", authRoutes); // ✅ örnek: /api/admin/sign-in


// ❗ Yalnızca database bağlantısı kurulunca başlasın
AppDataSource.initialize().then(() => {
    console.log("✅ Veritabanı bağlantısı başarılı!");

    // SEFERLERİ OKUMA İŞLEMİ ŞİMDİ BAŞLIYOR
 setInterval(async () => {
    const seferRepository = AppDataSource.getRepository(Sefer);
    const seferler = await seferRepository.find();

    for (const sefer of seferler) {
        const trafficData = await getTrafficData(
            { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
            { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
        );

        sefer.tahmini_sure = trafficData.duration;
        sefer.trafik_durumu = "unknown";  // ✅ Hata burada bitti
        await seferRepository.save(sefer);

        io.emit("seferGuncelle", sefer);
    }
}, 60000);


    io.on("connection", (socket) => {
        console.log("Bir istemci bağlandı.");
        socket.on("disconnect", () => {
            console.log("İstemci bağlantısı kesildi.");
        });
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
    });

}).catch((error) => {
    console.error("❌ Veritabanı bağlantısı başarısız:", error);
});

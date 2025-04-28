import { Router } from "express";
import { AppDataSource } from "../config/database";
import { SeferLog } from "../models/SeferLog";

const router = Router();

router.get("/trafik-analiz", async (req, res) => {
    try {
        const logRepository = AppDataSource.getRepository(SeferLog);

        // Saatlere göre ortalama tahmini süreyi hesapla
        const results = await logRepository.query(`
            SELECT 
                EXTRACT(HOUR FROM tarih) AS saat,
                AVG(tahmini_sure) AS ortalama_sure,
                COUNT(*) AS veri_sayisi
            FROM sefer_log
            GROUP BY saat
            ORDER BY saat;
        `);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: "Trafik analizi sırasında hata oluştu" });
    }
});

export default router;

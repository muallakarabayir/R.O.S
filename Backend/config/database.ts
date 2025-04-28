import 'reflect-metadata';
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Sefer } from "../models/Sefer";  // DOĞRUDAN import!
import { SeferLog } from "../models/SeferLog"; // DOĞRUDAN import!

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false, //loglama işlemleri gözlemlemek için kullanılır TEST İŞLEMLERİNDE ÇALIŞYTIR!!!
    entities: [Sefer, SeferLog],   // 👈 BURASI!
});


export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ PostgreSQL bağlantısı başarılı!");
    } catch (error) {
        console.error("❌ PostgreSQL bağlantı hatası:", error);
    }
};

import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./config/database";
import seferRoutes from "./routes/seferRoutes";
import { initializeSocket } from "./socket"; // Socket.IO'yı başlatmak için

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO başlatma
const io = initializeSocket(server);

app.use(cors());
app.use(express.json());

// Veritabanı bağlantısı
connectDB();

// Rotaları ekleme
app.use("/api", seferRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});

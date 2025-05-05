import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./config/database";
import seferRoutes from "./routes/seferRoutes";
import adminCreateUserRoute from "./routes/adminCreateUser"; // ✅ buraya eklendi
import { initializeSocket } from "./socket"; // Socket.IO'yı başlatmak için
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import driverRoutes from "./routes/driverRoutes";

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
app.use("/api/admin", authRoutes); // ✅ örnek: /api/admin/sign-in
app.use("/api", seferRoutes);
app.use("/api", adminCreateUserRoute); // ✅ buraya eklendi
app.use("/api", userRoutes);
app.use("/api/driver", driverRoutes);
console.log("typeof authRoutes ===", typeof authRoutes);
console.log("authRoutes.constructor.name ===", authRoutes.constructor.name);


console.log("authRoutes", typeof authRoutes);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});

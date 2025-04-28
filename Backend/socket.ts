import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
const app = express();
const httpServer = createServer(app);
let io: Server; 

export const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("🚀 Yeni kullanıcı bağlandı:", socket.id);

        socket.on("seferGuncelle", (data) => {
            console.log("📡 Sefer Güncelleme:", data);
            io.emit("seferGuncelle", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ Kullanıcı ayrıldı:", socket.id);
        });
    });

    return io;
};
export { io, httpServer };
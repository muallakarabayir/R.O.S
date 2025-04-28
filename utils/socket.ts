import io from "socket.io-client"; // Eğer yukarıdaki import hatalıysa bu alternatifi kullanın.

const socket = io("http://localhost:5000");

export const sendSeferUpdate = (sefer: any) => {
    socket.emit("seferGuncelle", sefer);
};

// 'data' parametresinin tipini belirleyin.
socket.on("seferGuncelle", (data: any) => {  // Burada 'data' parametresine tip verebilirsiniz.
    console.log("📡 Gerçek Zamanlı Güncelleme:", data);
});

export default socket;

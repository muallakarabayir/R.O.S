// utils/recommendEarlyDeparture.ts

import { Sefer } from "../models/Sefer";
import { getTrafficData } from "../../utils/getTrafficData";  // Yolu iki üst dizine çıkarak doğru şekilde güncelledik
 // Trafik verisini almak için

export const recommendEarlyDeparture = async (sefer: Sefer): Promise<string> => {
    // Trafik verisini alıyoruz
    const trafficData = await getTrafficData(
        { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
        { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
    );

    // Şu anki saati alıyoruz
    const currentTime = new Date();
    
    // Yola çıkılacak saati alıyoruz (seferin başlangıç saati)
    const departureTime = new Date(currentTime.getTime() + trafficData.duration * 60000); // tahmini süreyi dakikaya çevirip ekliyoruz
    
    // Eğer seferin yapılacağı saat yoğun saatlere denk geliyorsa, öneri sunuyoruz
    if (trafficData.congestion === 'high') {
        // Yoğun saatte yola çıkmak yerine 2 saat önceden çıkmayı öneriyoruz
        const recommendedDepartureTime = new Date(departureTime.getTime() - 2 * 60 * 60000); // 2 saat önceden öneri
        return `Bugün saat 17:00'de yoğun trafik bekliyoruz. Erken çıkmak isterseniz, saat ${recommendedDepartureTime.getHours()}:${recommendedDepartureTime.getMinutes()}'te yola çıkmanız yeterli olacaktır.`;
    } else {
        // Yoğunluk yoksa, normal saatte çıkılabilir
        return `Bugün yoğun trafik beklenmiyor. Saat ${departureTime.getHours()}:${departureTime.getMinutes()}'te rahatça yola çıkabilirsiniz.`;
    }
};

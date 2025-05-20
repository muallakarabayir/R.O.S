import { Sefer } from "../models/Sefer";
import { getTrafficData } from "../../utils/getTrafficData";

export const recommendEarlyDeparture = async (sefer: Sefer): Promise<string> => {
  const trafficData = await getTrafficData(
    { latitude: sefer.baslangic_lat, longitude: sefer.baslangic_lng },
    { latitude: sefer.varis_lat, longitude: sefer.varis_lng }
  );

  const currentTime = new Date();
  const durationMinutes = Math.round(trafficData.duration / 60);

  const departureTime = new Date(currentTime.getTime() + durationMinutes * 60000);

  if (trafficData.congestion === 'high') {
    const recommendedDepartureTime = new Date(departureTime.getTime() - 2 * 60 * 60000);
    return `Bugün saat 17:00'de yoğun trafik bekliyoruz. Erken çıkmak isterseniz, saat ${recommendedDepartureTime.getHours()}:${recommendedDepartureTime.getMinutes()}'te yola çıkmanız yeterli olacaktır.`;
  } else if (trafficData.congestion === 'medium') {
    const recommendedDepartureTime = new Date(departureTime.getTime() - 1 * 60 * 60000);
    return `Bugün trafik orta yoğunlukta. Erken çıkmak isterseniz, saat ${recommendedDepartureTime.getHours()}:${recommendedDepartureTime.getMinutes()}'te yola çıkmanız önerilir.`;
  } else {
    return `Bugün yoğun trafik beklenmiyor. Saat ${departureTime.getHours()}:${departureTime.getMinutes()}’te rahatça yola çıkabilirsiniz.`;
  }
};

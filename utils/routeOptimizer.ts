import { getGoogleTrafficData } from "./googleTraffic";
import { getOSMTrafficData } from "./osmTraffic";

export const findBestRoute = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number },
    useGoogle: boolean = true // Kullanıcı Google veya OSM seçebilir
) => {
    let googleData = await getGoogleTrafficData(start, end);
    let osmData = await getOSMTrafficData(start, end);

    if (useGoogle) {
        console.log("Google Seçildi:", googleData.durationInTraffic, "saniye");
        return googleData.route;
    } else {
        console.log("OSM Seçildi:", osmData.duration, "saniye");
        return osmData.route;
    }
};

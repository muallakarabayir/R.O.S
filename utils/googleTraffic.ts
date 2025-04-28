import { GOOGLE_MAPS_API_KEY } from "@env";

export const getGoogleTrafficData = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}&traffic_model=best_guess&departure_time=now`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.routes.length > 0) {
            return {
                durationInTraffic: data.routes[0].legs[0].duration_in_traffic?.value || 0, // Trafik süresi (saniye)
                route: data.routes[0].legs[0].steps.map((step: any) => ({
                    latitude: step.start_location.lat,
                    longitude: step.start_location.lng
                })),
            };
        } else {
            return { durationInTraffic: 0, route: [] };
        }
    } catch (error) {
        console.error("Google Traffic API Hatası:", error);
        return { durationInTraffic: 0, route: [] };
    }
};

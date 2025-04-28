const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getTrafficData = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
): Promise<{ duration: number; congestion: string }> => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}&mode=driving`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.routes.length > 0) {
            const leg = data.routes[0].legs[0];
            return {
                duration: leg.duration.value,
                congestion: "unknown",
            };
        } else {
            return { duration: 0, congestion: "unknown" };
        }
    } catch (error) {
        console.error("Google Traffic API Hatası:", error);
        return { duration: 0, congestion: "unknown" };
    }
};

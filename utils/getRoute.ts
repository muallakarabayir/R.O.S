const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getGoogleRoute = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
): Promise<{ latitude: number; longitude: number }[]> => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}&mode=driving`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.routes.length > 0) {
            return data.routes[0].legs[0].steps.map((step: any) => ({
                latitude: step.end_location.lat,
                longitude: step.end_location.lng,
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Google Directions API Hatası:", error);
        return [];
    }
};

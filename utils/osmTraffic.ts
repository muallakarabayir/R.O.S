export const getOSMTrafficData = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson&annotations=duration`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.routes.length > 0) {
            return {
                duration: data.routes[0].duration, // Trafikte geçen süre (saniye)
                route: data.routes[0].geometry.coordinates.map((coord: [number, number]) => ({
                    latitude: coord[1],
                    longitude: coord[0]
                })),
            };
        } else {
            return { duration: 0, route: [] };
        }
    } catch (error) {
        console.error("OSM Traffic API Hatası:", error);
        return { duration: 0, route: [] };
    }
};

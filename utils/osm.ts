export const getOSMDirections = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (data.routes.length > 0) {
            return data.routes[0].geometry.coordinates.map((coord: [number, number]) => ({
                latitude: coord[1],
                longitude: coord[0]
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error("OSM Directions API Hatası:", error);
        return [];
    }
};

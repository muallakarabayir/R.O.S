import { GOOGLE_MAPS_API_KEY } from '@env';

// Node ve Graph arayüzlerini adlandırılmış export olarak bırakıyoruz.
export interface Node {
    latitude: number;
    longitude: number;
    neighbors: string[];
}

export interface Graph {
    [key: string]: Node;
}

// haversineDistance fonksiyonunu adlandırılmış olarak export ediyoruz.
export const haversineDistance = (coord1: Node, coord2: Node): number => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
    const lat1 = coord1.latitude * (Math.PI / 180);
    const lat2 = coord2.latitude * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Mesafeyi km cinsinden döndür
};

// A* algoritmasını adlandırılmış olarak export ediyoruz.
export const aStar = (graph: Graph, start: string, goal: string): Node[] => {
    let openSet: string[] = [start];
    let cameFrom: { [key: string]: string } = {};
    let gScore: { [key: string]: number } = {};
    let fScore: { [key: string]: number } = {};

    for (let node in graph) {
        gScore[node] = Infinity;
        fScore[node] = Infinity;
    }
    gScore[start] = 0;
    fScore[start] = haversineDistance(graph[start], graph[goal]);

    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a] - fScore[b]);
        let current = openSet.shift() as string;

        if (current === goal) {
            let path: Node[] = [];
            while (current in cameFrom) {
                path.unshift(graph[current]);
                current = cameFrom[current];
            }
            path.unshift(graph[start]);
            return path;
        }

        for (let neighbor of graph[current].neighbors) {
            let tentative_gScore = gScore[current] + haversineDistance(graph[current], graph[neighbor]);
            if (tentative_gScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = gScore[neighbor] + haversineDistance(graph[neighbor], graph[goal]);
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return [];
};

// Google Maps yön bilgisi almayı sağlayan fonksiyonu adlandırılmış export ile dışa aktarıyoruz.
export const getGoogleDirections = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
): Promise<{ latitude: number; longitude: number }[]> => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}&traffic_model=best_guess&departure_time=now`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.routes.length > 0) {
            return data.routes[0].legs[0].steps.map((step: any) => ({
                latitude: step.start_location.lat,
                longitude: step.start_location.lng
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error("Google Directions API Hatası:", error);
        return [];
    }
};

// Eğer bir ana fonksiyon (örneğin, 'getOptimalRoute') dışa aktarılacaksa, onu default export yapabiliriz.
// Örneğin, şöyle bir fonksiyon ekleyebiliriz:
// const getOptimalRoute = () => { ... }
// export default getOptimalRoute;

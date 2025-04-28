import { Graph, Node, haversineDistance, aStar } from "./directions";

// En kısa rotayı bulan fonksiyon
const findOptimalRoute = (graph: Graph, start: string, goal: string): Node[] => {
    // Eğer başlangıç noktası ve varış noktası aynıysa boş bir dizi döndür
    if (start === goal) {
        return [];
    }

    // A* algoritmasını kullanarak rota hesaplama
    return aStar(graph, start, goal);
};

// Default export
export default findOptimalRoute;

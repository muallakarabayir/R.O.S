import { Graph, Node, haversineDistance, aStar } from "./directions";

export const findOptimalRoute = (graph: Graph, start: string, goal: string): Node[] => {
    return aStar(graph, start, goal);
};

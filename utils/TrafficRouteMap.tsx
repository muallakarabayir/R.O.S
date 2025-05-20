import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { findBestRoute } from "../utils/routeOptimizer";

interface TrafficRouteMapProps {
    start: { latitude: number; longitude: number };
    end: { latitude: number; longitude: number };
    useGoogle?: boolean;
}

const TrafficRouteMap: React.FC<TrafficRouteMapProps> = ({ start, end, useGoogle = true }) => {
    const [route, setRoute] = useState<{ latitude: number; longitude: number }[]>([]);

    useEffect(() => {
        const fetchRoute = async () => {
            const bestRoute = await findBestRoute(start, end, useGoogle);
            setRoute(bestRoute);
        };
        fetchRoute();
    }, [start, end, useGoogle]);

    return (
        <View style={styles.container}>
            <Text>MapView şu anda Expo Go'da desteklenmiyor.</Text>
            <Text>Başlangıç: {start.latitude}, {start.longitude}</Text>
            <Text>Varış: {end.latitude}, {end.longitude}</Text>
            <Text>Rota Noktaları: {route.length} adet</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default TrafficRouteMap;

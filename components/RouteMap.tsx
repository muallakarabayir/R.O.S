import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getGoogleDirections } from "../utils/directions";
import { getOSMDirections } from "../utils/osm";

interface RouteMapProps {
    start: { latitude: number; longitude: number };
    end: { latitude: number; longitude: number };
    useGoogle?: boolean;
}

const RouteMap: React.FC<RouteMapProps> = ({ start, end, useGoogle = true }) => {
    const [route, setRoute] = useState<{ latitude: number; longitude: number }[]>([]);

    useEffect(() => {
        const fetchRoute = async () => {
            const directions = useGoogle
                ? await getGoogleDirections(start, end)
                : await getOSMDirections(start, end);
            setRoute(directions);
        };
        fetchRoute();
    }, [start, end, useGoogle]);

    return (
        <View style={styles.container}>
            <Text>MapView Expo Go'da desteklenmiyor.</Text>
            <Text>Başlangıç: {start.latitude}, {start.longitude}</Text>
            <Text>Varış: {end.latitude}, {end.longitude}</Text>
            <Text>Rota noktası sayısı: {route.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default RouteMap;

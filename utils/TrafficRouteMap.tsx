import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
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
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: start.latitude,
                longitude: start.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
        >
            <Marker coordinate={start} title="Başlangıç Noktası" />
            <Marker coordinate={end} title="Varış Noktası" />
            <Polyline coordinates={route} strokeWidth={4} strokeColor="red" />
        </MapView>
    );
};

export default TrafficRouteMap;

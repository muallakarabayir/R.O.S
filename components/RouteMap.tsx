import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getGoogleDirections } from "../utils/directions";
import { getOSMDirections } from "../utils/osm";

interface RouteMapProps {
    start: { latitude: number; longitude: number };
    end: { latitude: number; longitude: number };
    useGoogle?: boolean; // Kullanıcı Google veya OSM seçebilsin
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
            <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
        </MapView>
    );
};

export default RouteMap;

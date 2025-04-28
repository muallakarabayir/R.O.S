import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import socket from "../utils/socket";

interface Sefer {
    id: number;
    baslangic_lat: number;
    baslangic_lng: number;
    varis_lat: number;
    varis_lng: number;
    route?: { latitude: number; longitude: number }[]; // Güzergah verisi (isteğe bağlı)
    tahmini_sure?: number; // Tahmini süre (isteğe bağlı)
    trafik_durumu?: string; // Trafik durumu (isteğe bağlı)
}

const SeferHarita = () => {
    const [seferler, setSeferler] = useState<Sefer[]>([]);

    useEffect(() => {
        // İlk yüklemede mevcut seferleri çek
        fetch("http://localhost:5000/api/seferler")
            .then((res) => res.json())
            .then((data) => setSeferler(data))
            .catch((err) => console.error("Seferleri çekerken hata:", err));

        // WebSocket ile gerçek zamanlı güncellemeleri dinle
        socket.on("seferGuncelle", (yeniSefer: Sefer) => {
            setSeferler((prev) => [...prev, yeniSefer]);
        });

        return () => {
            socket.off("seferGuncelle");
        };
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 39.9208,
                    longitude: 32.8541,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {seferler.map((sefer) => (
                    <React.Fragment key={sefer.id}>
                        {/* Başlangıç Noktası */}
                        <Marker
                            coordinate={{
                                latitude: sefer.baslangic_lat,
                                longitude: sefer.baslangic_lng,
                            }}
                            title="Başlangıç Noktası"
                            pinColor="green"
                        />

                        {/* Varış Noktası */}
                        <Marker
                            coordinate={{
                                latitude: sefer.varis_lat,
                                longitude: sefer.varis_lng,
                            }}
                            title={`Varış Noktası - Süre: ${sefer.tahmini_sure} dk`}
                            description={`Trafik Durumu: ${sefer.trafik_durumu}`}
                            pinColor="red"
                        />

                        {/* Güzergah Çizgisi */}
                        {sefer.route && (
                            <Polyline
                                coordinates={sefer.route}
                                strokeWidth={4}
                                strokeColor="blue"
                            />
                        )}
                    </React.Fragment>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default SeferHarita;

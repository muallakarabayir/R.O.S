import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import socket from "../utils/socket";

interface Sefer {
    id: number;
    baslangic_lat: number;
    baslangic_lng: number;
    varis_lat: number;
    varis_lng: number;
    tahmini_sure?: number;
    trafik_durumu?: string;
}

const SeferHarita: React.FC = () => {
    const [seferler, setSeferler] = useState<Sefer[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/seferler")
            .then((res) => res.json())
            .then((data) => setSeferler(data))
            .catch((err) => console.error("Seferleri çekerken hata:", err));

        socket.on("seferGuncelle", (yeniSefer: Sefer) => {
            setSeferler((prev) => [...prev, yeniSefer]);
        });

        return () => {
            socket.off("seferGuncelle");
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {seferler.map((sefer) => (
                <View key={sefer.id} style={styles.card}>
                    <Text>Sefer ID: {sefer.id}</Text>
                    <Text>Başlangıç: {sefer.baslangic_lat}, {sefer.baslangic_lng}</Text>
                    <Text>Varış: {sefer.varis_lat}, {sefer.varis_lng}</Text>
                    <Text>Tahmini Süre: {sefer.tahmini_sure} dk</Text>
                    <Text>Trafik Durumu: {sefer.trafik_durumu}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    card: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default SeferHarita;

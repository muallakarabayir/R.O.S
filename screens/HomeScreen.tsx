import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import SeferHarita from "../components/SeferHarita";
import NewTripScreen from "../screens/NewTripScreen";

const HomeScreen = () => {
    const [showNewTrip, setShowNewTrip] = useState(false);

    if (showNewTrip) {
        return <NewTripScreen />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerçek Zamanlı Sefer Haritası</Text>
            <Button title="➕ Yeni Sefer Oluştur" onPress={() => setShowNewTrip(true)} />
            <SeferHarita />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
});

export default HomeScreen;

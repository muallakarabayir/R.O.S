import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SeferHarita from "../components/SeferHarita";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerçek Zamanlı Sefer Haritası</Text>
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

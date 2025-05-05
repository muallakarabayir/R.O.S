// app/driver/requests.tsx

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyRequests = [
  { id: "1", passenger: "Mehmet Yılmaz", route: "A > B", time: "08:45" },
  { id: "2", passenger: "Elif Kaya", route: "C > D", time: "10:15" },
];

export default function Requests() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sefer İstekleri</Text>
      <FlatList
        data={dummyRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>👤 Yolcu: {item.passenger}</Text>
            <Text style={styles.text}>📍 Rota: {item.route}</Text>
            <Text style={styles.text}>🕒 Saat: {item.time}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#fff5e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: { fontSize: 16 },
});

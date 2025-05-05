// app/driver/requests.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialRequests = [
  { id: "1", passenger: "Ahmet Yılmaz", route: "Ankara → Konya", date: "2025-05-08" },
  { id: "2", passenger: "Elif Demir", route: "Konya → Adana", date: "2025-05-09" },
];

export default function Requests() {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id: string) => {
    Alert.alert("Onaylandı", `İstek ID: ${id}`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleDelete = (id: string) => {
    Alert.alert("Silindi", `İstek ID: ${id}`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sefer İstekleri</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.passenger}>👤 {item.passenger}</Text>
            <Text style={styles.route}>🛣️ {item.route}</Text>
            <Text style={styles.date}>📅 {item.date}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.approve]}
                onPress={() => handleApprove(item.id)}
              >
                <Text style={styles.buttonText}>Onayla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.delete]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffeeba",
  },
  passenger: { fontSize: 18, fontWeight: "500" },
  route: { fontSize: 16 },
  date: { fontSize: 16, fontStyle: "italic" },
  actions: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  approve: { backgroundColor: "#28a745" },
  delete: { backgroundColor: "#dc3545" },
  buttonText: { color: "white", fontWeight: "600" },
});

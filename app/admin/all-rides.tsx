// app/admin/all-rides.tsx

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Ride {
  id: string;
  driverName: string;
  destination: string;
  time: string;
  status: string;
}

const AdminAllRides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch("http://10.7.85.246:5000/api/rides/all");
        const data = await res.json();
        setRides(data);
      } catch (err) {
        console.error("Veriler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Şoför: {item.driverName}</Text>
      <Text>Varış: {item.destination}</Text>
      <Text>Zaman: {item.time}</Text>
      <Text>Durum: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tüm Seferler</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
});

export default AdminAllRides;

// 📁 app/(root)/(tabs)/rides.tsx

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Ride {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  seatsAvailable: number;
  price: number;
  busCompany: string;
}

export default function Rides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("https://your-api.com/api/rides");
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Otobüsler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const renderRide = ({ item }: { item: Ride }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.origin} → {item.destination}</Text>
      <Text>Firma: {item.busCompany}</Text>
      <Text>Kalkış: {new Date(item.departureTime).toLocaleString()}</Text>
      <Text>Koltuk: {item.seatsAvailable}</Text>
      <Text>Fiyat: {item.price}₺</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Rezervasyon Yapılabilir Otobüsler</Text>

      {loading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", margin: 10 },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
});

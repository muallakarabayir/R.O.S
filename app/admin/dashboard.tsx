import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const AdminDashboard = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleString("tr-TR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentDate(formatted);
    };

    updateDate(); // İlk açılışta çalışsın
    const interval = setInterval(updateDate, 60000); // Her dakika güncelle

    return () => clearInterval(interval); // Sayfa kapanınca temizle
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Admin Paneli</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <Text style={styles.welcome}>Hoş geldin, {user?.firstName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/CreateUser")}
      >
        <Text style={styles.buttonText}>Yeni Kullanıcı Oluştur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/all-rides")}
      >
        <Text style={styles.buttonText}>Seferleri Görüntüle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/create-driver")}
      >
        <Text style={styles.buttonText}>Yeni Şoför Oluştur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#dc3545" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  welcome: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AdminDashboard;

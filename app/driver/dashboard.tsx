import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const DriverDashboard = () => {
  const handleLogout = () => {
    router.replace("/"); // Ana sayfaya yönlendir
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚖 Şoför Paneli</Text>
      <Text style={styles.subtitle}>Hoş geldin! Bugünkü sefer bilgilerin yakında burada olacak.</Text>

      {/* Örnek bir buton */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DriverDashboard;

// 📄 File: app/(admin)/sign-in.tsx

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Uyarı", "Lütfen tüm alanları doldurun.");
      return;
    }
  
    try {
      const res = await fetch("http://10.7.85.246:5000/api/admin/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
  
      const data = await res.json();
      console.log("📨 API Yanıtı:", data);
  
      if (res.ok && data.user?.role === "admin") {
        Alert.alert("Giriş Başarılı", `Hoş geldin, ${data.user.name}`);
        router.replace("/admin/dashboard");
      } else {
        Alert.alert("Yetkisiz Giriş", "Bu e-posta bir admin hesabına ait değil.");
      }
    } catch (err) {
      console.error("❌ Giriş hatası:", err);
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Girişi</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AdminSignIn;

// app/admin/create-user.tsx

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const CreateUserScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const handleCreate = async () => {
    if (!email || !password || !name) {
      Alert.alert("Uyarı", "Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const res = await fetch("http://10.7.85.246:5000/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Başarılı", "Kullanıcı oluşturuldu.");
        router.back(); // AdminDashboard’a geri dön
      } else {
        Alert.alert("Hata", data?.error || "Kullanıcı oluşturulamadı.");
      }
    } catch (err) {
      console.error("Hata:", err);
      Alert.alert("Sunucu Hatası", "Bağlantı sağlanamadı.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yeni Kullanıcı Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="İsim"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre (min. 8 karakter)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Kullanıcı Oluştur</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});

export default CreateUserScreen;

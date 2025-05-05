import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateDriver() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      return Alert.alert("Uyarı", "Tüm alanları doldurun.");
    }

    try {
      const res = await fetch("http://10.7.85.246:5000/api/admin/create-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Başarılı", "Şoför oluşturuldu.");
        setForm({ name: "", email: "", phone: "", password: "" });
      } else {
        Alert.alert("Hata", data.message || "Oluşturulamadı.");
      }
    } catch (err) {
      Alert.alert("Hata", "Sunucuya ulaşılamadı.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yeni Şoför Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Şoförü Oluştur</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

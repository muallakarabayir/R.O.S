// 📄 File: app/(admin)/UserList.tsx

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Kullanıcılar alınamadı:", err);
        Alert.alert("Hata", "Kullanıcılar getirilemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kullanıcı Listesi</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
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
  userCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#555",
  },
});

export default UserListScreen;

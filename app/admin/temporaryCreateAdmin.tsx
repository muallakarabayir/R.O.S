import React, { useEffect } from "react";
import { Text, View } from "react-native";

const TemporaryCreateAdmin = () => {
  useEffect(() => {
    const createAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/sign-in",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "admin@example.com",
            password: "123456", // En az 8 karakter, ✔
            name: "Admin",
            role: "admin",
          }),
        });

        const data = await res.json();
        console.log("Yanıt:", data);
      } catch (err) {
        console.error("Admin oluşturulamadı:", err);
      }
    };

    createAdmin();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Admin oluşturma işlemi başlatıldı...</Text>
    </View>
  );
};

export default TemporaryCreateAdmin;

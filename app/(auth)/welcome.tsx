import { router } from "expo-router";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: "gray" }}>Skip</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to R.O.S</Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          style={{
            backgroundColor: "black",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>Kullanıcı Girişi Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/admin/sign-in")}
          style={{
            backgroundColor: "#007BFF",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>Admin Girişi Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/driver/sign-in")}
          style={{
            backgroundColor: "#28a745",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>Şoför Girişi Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

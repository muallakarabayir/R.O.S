import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Çıkış yapılamadı:", error);
    }
  };

  return (
    <SignedIn>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          Hoşgeldiniz, {user?.firstName}!
        </Text>

        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f3f3f3",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Image
            source={icons.out}
            style={{ width: 20, height: 20, marginRight: 10 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16, color: "#333" }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SignedIn>
  );
}

import React from "react";
import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function DriverDashboardLayout() {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await signOut();
          }}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: "#dc3545", fontWeight: "bold" }}>Çıkış</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#28a745",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="rides"
        options={{
          title: "Seferler",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "İstekler",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

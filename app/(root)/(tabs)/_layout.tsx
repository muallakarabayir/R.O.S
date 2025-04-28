import { Tabs } from "expo-router";
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View style={[styles.container, focused && styles.containerFocused]}>
    <View style={[styles.innerCircle, focused && styles.innerCircleFocused]}>
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#333333",
            borderRadius: 50,
            paddingBottom: 0,
            overflow: "hidden",
            marginHorizontal: 20,
            bottom: 30, // <-- BU SATIRI EKLE
            height: 78,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
          },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60, // biraz genişletiyoruz, isteğe bağlı
    height: 60, // tab yüksekliğinin %80'i gibi
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    marginBottom:30
  },
  containerFocused: {
    //backgroundColor: "#D1D5D", // bg-general-300
  },
  innerCircle: {
    width: 48, // w-12 (12 * 4)
    height: 48, // h-12
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999, // full rounded
  },
  innerCircleFocused: {
    backgroundColor: "#9CA3AF", // bg-general-400
  },
  image: {
    width: 28, // w-7 (7 * 4)
    height: 28, // h-7
  },
});

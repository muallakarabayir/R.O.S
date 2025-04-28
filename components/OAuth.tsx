import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { icons } from "@/constants";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });



  return (
    <View style={styles.container}>
      {/* "Or" Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Or</Text>
        <View style={styles.separator} />
      </View>

      {/* Google ile Giriş Butonu */}
      <TouchableOpacity style={styles.button}>
        <Image source={icons.google} style={styles.icon} />
        <Text style={styles.buttonText}>Google ile Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 15,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 220,
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});

export default OAuth;

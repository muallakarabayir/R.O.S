import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3700B3", // Daha koyu mor renk
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30, // Yuvarlak köşeler
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
    shadowColor: "#000", // Gölgeleme efekti
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android cihazlar için gölge
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase", // Büyük harfli yazı
  },
});

export default CustomButton;

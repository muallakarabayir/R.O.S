import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled"; // InputField'in doğru import edildiğinden emin olun.
import { icons } from "@/constants"; // icons'ın doğru import edildiğinden emin olun.
import { router } from "expo-router"; // expo-router kullanıyorsunuz.

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login Data:", { email, password });
    // Burada API çağrısı yapılabilir.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField
        label="Email"
        value={email}
        icon={icons.email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        value={password}
        icon={icons.lock}
        onChangeText={setPassword}
        placeholder="Enter your password"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        secureTextEntry={true}
      />
      <CustomButton title="Login" onPress={handleLogin} />

      {/* Sign-Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up"); // Sign-up sayfasına yönlendirme
          }}
        >
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: "#333",
  },
  signUpLink: {
    fontSize: 16,
    color: "#007BFF", // Mavi renk
    textDecorationLine: "underline", // Altı çizili link
  },
});

export default SignIn;

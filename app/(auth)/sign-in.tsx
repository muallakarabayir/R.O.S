import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled"; // doğru dosya ismi olduğuna dikkat et
import { icons } from "@/constants";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home"); // Başarılı giriş sonrası yönlendirme
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0]?.longMessage || "Login failed.");
    }
  }, [email, password, isLoaded]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş</Text>
      <InputField
        label="Email"
        value={email}
        icon={icons.email}
        onChangeText={setEmail}
        placeholder="Email adresinizi giriniz"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        keyboardType="email-address"
      />
      <InputField
        label="Şifre"
        value={password}
        icon={icons.lock}
        onChangeText={setPassword}
        placeholder="Şifrenizi giriniz"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        secureTextEntry={true}
      />
      <CustomButton title="Giriş Yap" onPress={handleLogin} />

      {/* Sign-Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Hesabınız yok mu? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={styles.signUpLink}>Kayıt Ol</Text>
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
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default SignIn;

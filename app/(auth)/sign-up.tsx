import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUpScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [isHomePage, setIsHomePage] = useState(false); // Track if user is on home page

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });



        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  const onHomeRedirect = () => {
    router.push("/(root)/(tabs)/home");
    setIsHomePage(true); // Set the flag to true when navigating to the home page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <InputField
        label="Ad"
        value={form.name}
        icon={icons.person}
        onChangeText={(value) => setForm({ ...form, name: value })}
        placeholder="Adınızı Giriniz"
      />
      <InputField
        label="Email"
        value={form.email}
        icon={icons.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        placeholder="Mail Adresinizi Giriniz"
        keyboardType="email-address"
      />
      <InputField
        label="Şifre"
        value={form.password}
        icon={icons.lock}
        onChangeText={(value) => setForm({ ...form, password: value })}
        placeholder="Şifrenizi Giriniz"
        secureTextEntry={true}
      />
      <CustomButton title="Kayıt ol" onPress={onSignUpPress} />
      <OAuth />
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Zaten bir hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={styles.signInLink}>Giriş Yapın</Text>
        </TouchableOpacity>
      </View>

      <ReactNativeModal
        isVisible={verification.state === "pending" || verification.state === "success" && !isHomePage}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {verification.state === "success" ? "Doğrulandı" : "Doğrulama"}
          </Text>
          {verification.state === "success" ? (
            <>
              <Text>Başarıyla email adresinizi onayladınız.</Text>
              <CustomButton
                title="Ana Sayfaya Git"
                onPress={onHomeRedirect}
              />
            </>
          ) : (
            <>
              <Text>Mail adresinize kod gönderdik {form.email}.</Text>
              <InputField
                label="Kod"
                icon={icons.lock}
                value={verification.code}
                onChangeText={(code) => setVerification({ ...verification, code })}
                placeholder="Kodu Giriniz"
                keyboardType="numeric"
              />
              {verification.error && <Text style={styles.errorText}>{verification.error}</Text>}
              <CustomButton title="Emaili Doğrula" onPress={onVerifyPress} />
            </>
          )}
        </View>
      </ReactNativeModal>
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
  signInContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: "#333",
  },
  signInLink: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default SignUpScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
<<<<<<< HEAD
//import { ReactNativeModal } from "react-native-modal";


=======
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
>>>>>>> 5204398c5d322ffb9e7893e3863e115cd9d0f25a

const SignUpScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
<<<<<<< HEAD
    state:'success',
    error:'',
    code:''
    
  })
  const onSignUpPress = async () => {
    if (!isLoaded) return
  
    try {
      const result = await signUp.create({
        emailAddress: form.email,
        password: form.password
      });
      console.log("✅ SignUp success:", result);
  
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      console.log("📩 Verification email sent!");
  
      setVerification({
        ...verification,
        state: 'pending'
      });
    } catch (err: any) {
      console.error("❌ SignUp error:", JSON.stringify(err, null, 2));
    }
  }
  
// Handle submission of verification form
const onVerifyPress = async () => {
  if (!isLoaded) return

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code: verification.code
    });
    console.log("✅ Verification result:", signUpAttempt);

    if (signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId });
      setVerification({ ...verification, state: "success" });
      console.log("🚀 Verification complete, navigating to home");

      router.replace("/"); // Başarılı olunca ana sayfaya yönlendiriyoruz
    } else {
      console.warn("⚠️ Verification incomplete:", signUpAttempt.status);
      setVerification({
        ...verification,
        error: "Verification failed",
        state: "failed"
      });
    }
  } catch (err: any) {
    console.error("❌ Verification error:", JSON.stringify(err, null, 2));
    setVerification({
      ...verification,
      error: err.errors?.[0]?.longMessage || "Unknown error",
      state: "failed"
    });
  }
}


=======
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

>>>>>>> 5204398c5d322ffb9e7893e3863e115cd9d0f25a
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <InputField
        label="Ad"
        value={form.name}
        icon={icons.person}
<<<<<<< HEAD
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="İsminizi Giriniz"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
=======
        onChangeText={(value) => setForm({ ...form, name: value })}
        placeholder="Adınızı Giriniz"
>>>>>>> 5204398c5d322ffb9e7893e3863e115cd9d0f25a
      />
      <InputField
        label="Email"
        value={form.email}
        icon={icons.email}
<<<<<<< HEAD
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="Enter your email"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
=======
        onChangeText={(value) => setForm({ ...form, email: value })}
        placeholder="Mail Adresinizi Giriniz"
>>>>>>> 5204398c5d322ffb9e7893e3863e115cd9d0f25a
        keyboardType="email-address"
      />
      <InputField
        label="Şifre"
        value={form.password}
        icon={icons.lock}
<<<<<<< HEAD
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="Enter your password"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
=======
        onChangeText={(value) => setForm({ ...form, password: value })}
        placeholder="Şifrenizi Giriniz"
>>>>>>> 5204398c5d322ffb9e7893e3863e115cd9d0f25a
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

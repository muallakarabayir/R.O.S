import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";

const SignUpScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn, signOut } = useAuth();

  const [verification, setVerification] = useState({
    state: "idle", // idle, pending, success, failed
    error: "",
    code: "",
  });

  // 🔒 Giriş yapılmışsa kayıt ekranına erişim engellenir
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(root)/(tabs)/home");
    }
  }, [isSignedIn]);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      console.log("❌ Clerk henüz yüklenmedi.");
      return;
    }

    if (!form.email || !form.password) {
      setVerification((prev) => ({
        ...prev,
        error: "E-posta ve şifre zorunludur.",
      }));
      return;
    }

    console.log("🚀 Kayıt işlemi başlatıldı");

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        firstName: form.name,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("✅ E-posta doğrulama kodu gönderildi");
      setVerification((prev) => ({
        ...prev,
        state: "pending",
        error: "",
      }));
    } catch (err: any) {
      console.error("🛑 Kayıt hatası:", JSON.stringify(err, null, 2));

      const message =
        err?.errors?.[0]?.longMessage ||
        err?.message ||
        "Kayıt başarısız. Lütfen tekrar deneyin.";

      setVerification((prev) => ({
        ...prev,
        error: message,
      }));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        setVerification((prev) => ({
          ...prev,
          state: "success",
          error: "",
        }));

        router.replace("/(root)/(tabs)/home");
      } else {
        setVerification((prev) => ({
          ...prev,
          error: "Doğrulama başarısız. Lütfen tekrar deneyin.",
          state: "failed",
        }));
      }
    } catch (err: any) {
      console.error("🛑 Doğrulama hatası:", JSON.stringify(err, null, 2));
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.message ||
        "Kod doğrulanamadı.";

      setVerification((prev) => ({
        ...prev,
        error: message,
        state: "failed",
      }));
    }
  };

  return (
    <View style={styles.container}>
      {verification.state === "pending" ? (
        <>
          <Text style={styles.title}>E-posta Doğrulama</Text>
          <InputField
            label="Doğrulama Kodu"
            placeholder="E-posta ile gelen kod"
            value={verification.code}
            onChangeText={(val: string) =>
              setVerification((prev) => ({ ...prev, code: val }))
            }
          />
          <CustomButton title="Kodu Doğrula" onPress={onVerifyPress} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Kayıt Ol</Text>
          <InputField
            label="Ad"
            value={form.name}
            icon={icons.person}
            onChangeText={(val: string) =>
              setForm((prev) => ({ ...prev, name: val }))
            }
            placeholder="İsminizi girin"
          />
          <InputField
            label="Email"
            value={form.email}
            icon={icons.email}
            onChangeText={(val: string) =>
              setForm((prev) => ({ ...prev, email: val }))
            }
            placeholder="E-posta adresiniz"
            keyboardType="email-address"
          />
          <InputField
            label="Şifre"
            value={form.password}
            icon={icons.lock}
            onChangeText={(val: string) =>
              setForm((prev) => ({ ...prev, password: val }))
            }
            placeholder="Şifreniz"
            secureTextEntry
          />
          <CustomButton title="Kayıt Ol" onPress={onSignUpPress} />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text style={styles.signInLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>

          <OAuth />

          {/* 🔓 Oturumu sonlandırmak için çıkış butonu */}
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={async () => {
              try {
                await signOut();
              } catch (error) {
                console.error("Çıkış hatası:", error);
              }
            }}
          >
            <Text style={{ color: "gray", fontSize: 14 }}>Çıkış Yap</Text>
          </TouchableOpacity>
        </>
      )}

      {verification.error ? (
        <Text style={{ color: "red", marginTop: 10 }}>
          {verification.error}
        </Text>
      ) : null}
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
});

export default SignUpScreen;

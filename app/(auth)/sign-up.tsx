import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled"; // InputField'in doğru import edildiğinden emin olun.
import { icons } from "@/constants"; // icons'ın doğru import edildiğinden emin olun.
import { router } from "expo-router"; // expo-router kullanıyorsunuz.
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
//import { ReactNativeModal } from "react-native-modal";



const SignUpScreen = () => {
  const[form, setForm]= useState({
    name:"",
    email:"",
    password:""
  })

  const { isLoaded, signUp, setActive } = useSignUp()

  const [verification, setVerification] = useState({
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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <InputField
        label="Name"
        value={form.name}
        icon={icons.person}
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="İsminizi Giriniz"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
      />
      <InputField
        label="Email"
        value={form.email}
        icon={icons.email}
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="Enter your email"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        value={form.password}
        icon={icons.lock}
        onChangeText={(value: string) => setForm({ ...form, name: value })}
        placeholder="Enter your password"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        secureTextEntry={true}
      />
      <CustomButton title="Sign Up" onPress={onSignUpPress} />
      
      {/* Sign-In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-in"); // Sign-in sayfasına yönlendirme
          }}
        >
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
     <OAuth/>

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
    color: "#007BFF", // Mavi renk
    textDecorationLine: "underline", // Altı çizili link
  },
});

export default SignUpScreen;

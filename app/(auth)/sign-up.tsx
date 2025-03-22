import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled"; // InputField'in doğru import edildiğinden emin olun.
import { icons } from "@/constants"; // icons'ın doğru import edildiğinden emin olun.
import { router } from "expo-router"; // expo-router kullanıyorsunuz.
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
import { ReactNativeModal } from "react-native-modal";



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

 // Handle submission of sign-up form
 const onSignUpPress = async () => {
  if (!isLoaded) return

  // Start sign-up process using email and password provided
  try {
    await signUp.create({
      emailAddress:form.email,
      password:form.password
    })

    // Send user an email with verification code
    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

    // Set 'pendingVerification' to true to display second form
    // and capture OTP code
    setVerification({
      ...verification,
      state:'pending'
    })
  } catch (err) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error(JSON.stringify(err, null, 2))
  }
}

// Handle submission of verification form
const onVerifyPress = async () => {
  if (!isLoaded) return

  try {
    // Use the code the user provided to attempt verification
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code:verification.code
    })

    // If verification was completed, set the session to active
    // and redirect the user
    if (signUpAttempt.status === 'complete') {

      //TODO: Create a database user!
      await setActive({ session: signUpAttempt.createdSessionId })
      setVerification({...verification,state:"success"});
    } else {
      // If the status is not complete, check why. User may need to
      // complete further steps.
      setVerification({
        ...verification,
        error:"Verifaction failed",
        state:"failed"
      })
    }
  } catch (err: any) {
    setVerification({
      ...verification,
      error: err.erros[0].longMessage,
      state:"failed"
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
        onChangeText={(value) => setForm({ ...form, name: value })}
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
        onChangeText={(value) => setForm({ ...form, email: value })}        placeholder="Enter your email"
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
        onChangeText={(value) => setForm({ ...form, password: value })}        placeholder="Enter your password"
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

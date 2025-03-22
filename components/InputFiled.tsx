import React from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  placeholder,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.inputContainer, containerStyle]}>
          {label && (
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          )}
          <View style={[styles.inputWrapper, containerStyle]}>
            {icon && (
              <Image source={icon} style={[styles.icon, iconStyle]} />
            )}
            <TextInput
              style={[styles.input, inputStyle]}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="#555" // Koyu renkli placeholder
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20, // Mesafeyi azalttık
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3, // Label ve input arasındaki mesafeyi azalttık
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12, // İçerideki boşluğu biraz azalttık
    height: 45, // Input yüksekliğini biraz azalttık
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8, // İkonun sağındaki mesafeyi azalttık
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    width: "100%",
  },
});

export default InputField;

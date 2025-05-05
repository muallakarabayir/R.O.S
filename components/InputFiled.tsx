import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: object;
  containerStyle?: object;
  inputStyle?: object;
  iconStyle?: object;
}

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
}: InputFieldProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputWrapper}>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#888"
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#888",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default InputField;

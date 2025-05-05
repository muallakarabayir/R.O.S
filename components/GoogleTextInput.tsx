import { GoogleInputProps } from "@/types/type";
import { View, Text } from "react-native";
import { icons } from "@/constants"; // Bu tamam.

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgrounColor,
    handlePress,
}: GoogleInputProps) => (
    <View
        style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderRadius: 50,
        }}
    >
        <Text>Search</Text>
    </View>
);

export default GoogleTextInput;

import {View,Text, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

const InputField = ({}) =>(
    <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
            <View style={{marginVertical:8,width:"100%"}}>
                <Text >{}</Text>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
)

export default InputField;
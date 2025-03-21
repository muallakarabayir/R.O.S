import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";



const Onboarding=()=>{

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
    
  return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/sign-up");
          }}
          style={{
            position: "absolute",
            top: 50,
            right: 10,
            padding: 10,
          }}
        >
          <Text style={{color:"black",}}>Skip</Text>
        </TouchableOpacity>
     


      </SafeAreaView>
      
    )
}
export default Onboarding;
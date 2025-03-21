import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
const SignUp = () => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Ortalanmış resim */}
        <Image
          source={images.cityBus} // Örneğin cityBus resmini burada kullanıyoruz
          style={styles.image}
        />
        <Text>
            Hesabınızı Oluşturunuz!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center", // Dikeyde ortalama
    alignItems: "center", // Yatayda ortalama
  },
  container: {
    flex: 1,
    justifyContent: "center", // Yatayda ve dikeyde ortalama
    alignItems: "center", // Yatayda ortalama
    backgroundColor: "white",
  },
  image: {
    width: 200, // Resmin genişliği
    height: 200, // Resmin yüksekliği
  },
});

export default SignUp;

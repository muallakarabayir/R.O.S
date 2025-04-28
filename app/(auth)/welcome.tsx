import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper"; // Swiper importu doğru

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        onIndexChanged={setActiveIndex} // Aktif indexi takip etmek için
        style={styles.swiper}
      >
        {/* Swiper Slide 1 */}
        <View style={styles.slide}>
          <Image source={{ uri: 'https://placeimg.com/640/480/tech' }} style={styles.image} />
          <Text style={styles.text}>Welcome to the App!</Text>
        </View>
        
        {/* Swiper Slide 2 */}
        <View style={styles.slide}>
          <Image source={{ uri: 'https://placeimg.com/640/480/business' }} style={styles.image} />
          <Text style={styles.text}>Discover New Features</Text>
        </View>

        {/* Swiper Slide 3 */}
        <View style={styles.slide}>
          <Image source={{ uri: 'https://placeimg.com/640/480/architecture' }} style={styles.image} />
          <Text style={styles.text}>Start Exploring Now</Text>
        </View>
      </Swiper>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  swiper: {
    flex: 1,
    width: "100%",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
  },
  skipText: {
    color: "black",
    fontSize: 16,
  },
});

export default Onboarding;

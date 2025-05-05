import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, SignedIn } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();

  return (
    <SignedIn>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Profil Bilgileri</Text>

        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        )}

        <View style={styles.info}>
          <Text style={styles.label}>Ad:</Text>
          <Text style={styles.value}>{user?.firstName || "Belirtilmemiş"}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Soyad:</Text>
          <Text style={styles.value}>{user?.lastName || "Belirtilmemiş"}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.value}>{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
      </SafeAreaView>
    </SignedIn>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  info: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    marginRight: 10,
  },
  value: {
    color: "#333",
  },
});

export default Profile;

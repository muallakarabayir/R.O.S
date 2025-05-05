import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import { icons } from "@/constants";
import GoogleTextInput from "@/components/GoogleTextInput";

interface Ride {
  ride_id: string;
  origin_address: string;
  destination_address: string;
  origin_latitude: string;
  origin_longitude: string;
  destination_latitude: string;
  destination_longitude: string;
  ride_time: number;
  fare_price: string;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    driver_id: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: string;
  };
}

const recentRides: Ride[] = [/* ride verilerini buraya ekle */];

const normalizedRides = recentRides.map((ride) => ({
  ...ride,
  origin_latitude: parseFloat(ride.origin_latitude),
  origin_longitude: parseFloat(ride.origin_longitude),
  destination_latitude: parseFloat(ride.destination_latitude),
  destination_longitude: parseFloat(ride.destination_longitude),
  fare_price: parseFloat(ride.fare_price),
  driver: {
    ...ride.driver,
    driver_id: Number(ride.driver.driver_id),
    rating: parseFloat(ride.driver.rating),
  },
}));

export default function ReservationsPage() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Çıkış yapılamadı:", err);
    }
  };

  const handleDestinationPress = () => {};

  return (
    <SignedIn>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={normalizedRides}
          keyExtractor={(item) => item.ride_id}
          renderItem={({ item }) => <RideCard ride={item} />}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 20,
          }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text>Henüz rezervasyon yok.</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24 }}>
                  Gelecek Rezervasyonlar, {user?.firstName}
                </Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                >
                  <Image source={icons.out} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <GoogleTextInput
                icon={icons.search}
                handlePress={handleDestinationPress}
              />
            </>
          )}
        />
      </SafeAreaView>
    </SignedIn>
  );
}

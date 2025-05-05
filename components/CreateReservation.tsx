import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Location from "expo-location";

const CreateReservation = () => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Hata", "Konum izni reddedildi.");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCoords(location.coords);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Konum Hatası", error.message);
        } else {
          Alert.alert("Bilinmeyen Hata", "Beklenmeyen bir hata oluştu.");
        }
      }
      
    };

    getUserLocation();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {coords ? (
        <Text>
          Konumunuz: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text>Konum alınıyor...</Text>
      )}
    </View>
  );
};

export default CreateReservation;

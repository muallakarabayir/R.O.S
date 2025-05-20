import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

interface MapScreenProps {
  start: { latitude: number; longitude: number } | null;
  end: { latitude: number; longitude: number } | null;
  onSetStart: (location: { latitude: number; longitude: number }) => void;
  onSetEnd: (location: { latitude: number; longitude: number }) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ start, end, onSetStart, onSetEnd }) => {
  const [route, setRoute] = React.useState<{ latitude: number; longitude: number }[]>([]);

  const handleMockPressStart = () => {
    onSetStart({ latitude: 41.0082, longitude: 28.9784 });
  };

  const handleMockPressEnd = async () => {
    const endPoint = { latitude: 41.0151, longitude: 28.9795 };
    onSetEnd(endPoint);
    await fetchRoute(endPoint);
  };

  const fetchRoute = async (destination: { latitude: number; longitude: number }) => {
    if (!start) return;

    const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${destination.latitude},${destination.longitude}&mode=drive&apiKey=${EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates[0].map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        setRoute(coordinates);
      } else {
        console.warn("Rota bulunamadı:", data);
      }
    } catch (error) {
      console.error("Rota alınırken hata oluştu:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📍 Harita (MapView) Expo Go modunda gösterilemiyor.</Text>
      <Text style={styles.text}>Başlangıç: {start ? `${start.latitude}, ${start.longitude}` : 'Seçilmedi'}</Text>
      <Text style={styles.text}>Varış: {end ? `${end.latitude}, ${end.longitude}` : 'Seçilmedi'}</Text>
      <Text style={styles.text}>Rota noktaları: {route.length}</Text>

      <Button title="Başlangıç Belirle" onPress={handleMockPressStart} />
      <Button title="Varış ve Rota Belirle" onPress={handleMockPressEnd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { marginVertical: 10, textAlign: 'center' },
});

export default MapScreen;

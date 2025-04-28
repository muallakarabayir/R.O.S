import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

interface MapScreenProps {
  start: { latitude: number; longitude: number } | null;
  end: { latitude: number; longitude: number } | null;
  onSetStart: (location: { latitude: number; longitude: number }) => void;
  onSetEnd: (location: { latitude: number; longitude: number }) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ start, end, onSetStart, onSetEnd }) => {
  const [route, setRoute] = React.useState<{ latitude: number; longitude: number }[]>([]);

  const handleMapPress = (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    if (!start) {
      onSetStart(event.nativeEvent.coordinate);
    } else if (!end) {
      onSetEnd(event.nativeEvent.coordinate);
      fetchRoute(event.nativeEvent.coordinate);
    }
  };

  const fetchRoute = async (destination: { latitude: number; longitude: number }) => {
    if (!start) return;
    const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // API anahtarınızı buraya ekleyin
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes.length) {
        const points = data.routes[0].overview_polyline.points;
        setRoute(decodePolyline(points));
      }
    } catch (error) {
      console.error("Rota alınırken hata oluştu:", error);
    }
  };

  const decodePolyline = (encoded: string): { latitude: number; longitude: number }[] => {
    let points: { latitude: number; longitude: number }[] = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;
      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleMapPress}>
        {start && <Marker coordinate={start} title="Başlangıç" />}
        {end && <Marker coordinate={end} title="Varış" />}
        {route.length > 0 && <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;

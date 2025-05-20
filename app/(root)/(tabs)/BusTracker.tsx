import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const BusTracker = () => {
  const [busLocation, setBusLocation] = useState({
    latitude: 41.0082,
    longitude: 28.9784,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => ({
        latitude: prev.latitude + 0.0002,
        longitude: prev.longitude + 0.0001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          ...busLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={busLocation}
          title="Otobüs"
          description="Canlı takip edilen otobüs"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default BusTracker;

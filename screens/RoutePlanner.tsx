import React, { useState } from 'react';
import { View, Button } from 'react-native';
import MapScreen from '../components/MapScreen';

const RoutePlanner = () => {
  const [start, setStart] = useState<{ latitude: number; longitude: number } | null>(null);
  const [end, setEnd] = useState<{ latitude: number; longitude: number } | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <MapScreen start={start} end={end} onSetStart={setStart} onSetEnd={setEnd} />
      <Button title="Rotayı Hesapla" onPress={() => console.log("Rotayı hesapla")} />
    </View>
  );
};

export default RoutePlanner;

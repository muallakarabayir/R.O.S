import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';

const NewTripScreen = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [passengerCapacity, setPassengerCapacity] = useState('');
  const [createdByUserId, setCreatedByUserId] = useState('');

  const handleSaveTrip = () => {
    const newTrip = {
      startLocation,
      endLocation,
      departureTime,
      vehicleNumber,
      driverName,
      passengerCapacity: Number(passengerCapacity),
      createdByUserId,
    };

    console.log('Yeni Sefer:', newTrip);

    // Şimdilik alert gösterelim, sonra backend bağlantısı kurarız
    Alert.alert('Sefer Kaydedildi', JSON.stringify(newTrip, null, 2));

    // Burada POST isteği atacağız (ileride)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>📍 Başlangıç Noktası</Text>
      <TextInput
        style={styles.input}
        placeholder="Başlangıç noktası girin"
        value={startLocation}
        onChangeText={setStartLocation}
      />

      <Text style={styles.label}>🏁 Bitiş Noktası</Text>
      <TextInput
        style={styles.input}
        placeholder="Bitiş noktası girin"
        value={endLocation}
        onChangeText={setEndLocation}
      />

      <Text style={styles.label}>🕑 Sefer Saati</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 14:30"
        value={departureTime}
        onChangeText={setDepartureTime}
      />

      <Text style={styles.label}>🚌 Araç Plakası / No</Text>
      <TextInput
        style={styles.input}
        placeholder="Araç plakası veya numarası"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      />

      <Text style={styles.label}>👤 Şoför İsmi</Text>
      <TextInput
        style={styles.input}
        placeholder="Şoför ismini girin"
        value={driverName}
        onChangeText={setDriverName}
      />

      <Text style={styles.label}>💺 Yolcu Kapasitesi</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 45"
        value={passengerCapacity}
        onChangeText={setPassengerCapacity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>👤 Kullanıcı ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı ID"
        value={createdByUserId}
        onChangeText={setCreatedByUserId}
      />

      <Button title="Seferi Kaydet" onPress={handleSaveTrip} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default NewTripScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Platform, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectStopsScreen = () => {
  const [pickupCity, setPickupCity] = useState<string | null>(null);
  const [dropoffCity, setDropoffCity] = useState<string | null>(null);
  const [travelDate, setTravelDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!pickupCity || !dropoffCity) {
      Alert.alert("Eksik Bilgi", "Lütfen durakları seçiniz.");
      return;
    }

    setConfirmed(true);

    // Backend'e gönderilecek örnek veri
    console.log("Rezervasyon Gönderildi:", {
      kalkis: pickupCity,
      varis: dropoffCity,
      saat: travelDate.toISOString(),
    });

    Alert.alert("Gönderildi", "Rezervasyon şoför onayına iletildi.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rezervasyon İçin Durak Seç</Text>

      <Text style={styles.label}>Nereden bineceksiniz?</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={pickupCity} onValueChange={setPickupCity}>
          <Picker.Item label="Seçiniz" value={null} />
          <Picker.Item label="Ankara Otogar" value="ankara" />
          <Picker.Item label="İstanbul Esenler" value="istanbul" />
        </Picker>
      </View>

      <Text style={styles.label}>Nerede ineceksiniz?</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={dropoffCity} onValueChange={setDropoffCity}>
          <Picker.Item label="Seçiniz" value={null} />
          <Picker.Item label="Ankara Otogar" value="ankara" />
          <Picker.Item label="İstanbul Esenler" value="istanbul" />
        </Picker>
      </View>

      <Text style={styles.label}>Seyahat Zamanı</Text>
      <Button title="Tarih ve Saat Seç" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={travelDate}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setTravelDate(selectedDate);
          }}
        />
      )}

      <View style={{ marginVertical: 20 }}>
        <Button title="Rezervasyonu Gönder" onPress={handleConfirm} />
      </View>

      {confirmed && (
        <View style={styles.result}>
          <Text>🚌 Sefer Bilgileri:</Text>
          <Text>• Kalkış: {pickupCity}</Text>
          <Text>• Varış: {dropoffCity}</Text>
          <Text>• Tarih: {travelDate.toLocaleString()}</Text>
          <Text>• Durum: Şoför onayını bekliyor</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  result: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default SelectStopsScreen;

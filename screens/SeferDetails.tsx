// src/components/SeferDetails.tsx

import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

type SeferDetailsProps = {
  seferId: number;
};

const SeferDetails = ({ seferId }: SeferDetailsProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeferDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sefer-guncelle/${seferId}`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Bilgiler alınırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeferDetails();
  }, [seferId]);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SeferDetails;

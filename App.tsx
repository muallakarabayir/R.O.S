import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Splash ekranının otomatik olarak gizlenmesini engelle
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // Burada gerekli başlatma işlemleri yapılabilir
      // Örneğin, veri yüklemeler, font yüklemeler vb.
      
      // 2 saniye sonra Splash ekranını gizle
      await new Promise(resolve => setTimeout(resolve, 2000)); // Süreyi burada ayarlayabilirsiniz
      await SplashScreen.hideAsync();  // Splash ekranını gizle
    };

    prepare();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to BusApp!</Text>
    </View>
  );
}

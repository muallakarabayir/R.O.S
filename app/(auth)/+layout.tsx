import { Stack } from 'expo-router';


const Layout = () => {
  return (
    <Stack>
      {/* Stack içinde her sayfa ile ilgili yönlendirme yapılıyor */}
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Layout;

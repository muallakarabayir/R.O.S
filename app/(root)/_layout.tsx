import { Tabs } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <Tabs />;
}

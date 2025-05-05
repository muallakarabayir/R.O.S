import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Index;

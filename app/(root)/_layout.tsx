<<<<<<< HEAD
import {Stack} from "expo-router";

const Layout =()=>{
    return(
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        </Stack>
    )
}
=======
import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs />;
}
>>>>>>> 8a35e702f7cbeb8bc324a0391693c88b49412a18

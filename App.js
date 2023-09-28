import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { Cart } from "./screens";
import Test from "./screens/Test";
import Recycle from "./screens/Recycle";
import Reuse from "./screens/GiveAway";
import Repair from "./screens/Repair";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const firebaseConfig = {
    apiKey: "AIzaSyAlNG-bgiezAnpcZyro90V3odkZ2XowXSU",
    authDomain: "scrapie-85d87.firebaseapp.com",
    projectId: "scrapie-85d87",
    storageBucket: "scrapie-85d87.appspot.com",
    messagingSenderId: "92530576790",
    appId: "1:92530576790:web:53b0af7a2afd1583b721b7",
    measurementId: "G-KPV0GF3HHE",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recycle"
          component={Recycle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reuse"
          component={Reuse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair"
          component={Repair}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

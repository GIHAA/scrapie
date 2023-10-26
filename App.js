import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomNavBar";
import {RecycleCenterHome, StartScreen, Register, Login, RecyclersMap} from "./screens"
import { db } from "./firebase.config";
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
              name="Start"
              component={StartScreen}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false}}
          />
          <Stack.Screen
              name="Bottom Navigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Recycle Center Home Screen"
              component={RecycleCenterHome}
              options={{headerShown: true}}
          />
          <Stack.Screen
              name="Recyclers Map"
              component={RecyclersMap}
              options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

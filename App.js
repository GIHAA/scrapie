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
import ViewProduct from "./screens/ViewProduct"
import { db } from "./firebase.config";
import SelectRepairCenter from "./screens/SelectRepairCenter";
import ConfirmRequestRepairCenter from "./screens/ConfirmRequestRepairCenter";
import RepairCenterRequest from "./screens/RepairCenterRequest";

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
        <Stack.Screen
          name="SelectRepairCenter"
          component={SelectRepairCenter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmRequestRepairCenter"
          component={ConfirmRequestRepairCenter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RepairCenterRequest"
          component={RepairCenterRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewProduct"
          component={ViewProduct}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

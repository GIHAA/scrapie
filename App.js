import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import RCBottomNavBar from "./navigation/RCBottomNavBar";
import { Cart, Profile, RecycleRequest, RecycleRequests, RecycleCenterHome, RecyclersMap, MapTest, CollectionRequests, CollectionRoutes, RecycleCenterProfile } from "./screens";
import Test from "./screens/Test";
import Recycle from "./screens/recycle/Recycle";
import ViewRecycleRequest from "./components/recycle/ViewRecycleRequest"
import Reuse from "./screens/GiveAway";
import Repair from "./screens/Repair";
import ViewProduct from "./screens/ViewProduct";
import { db } from "./firebase.config";
import SelectRepairCenter from "./screens/SelectRepairCenter";
import ConfirmRequestRepairCenter from "./screens/ConfirmRequestRepairCenter";
import RepairCenterRequest from "./screens/RepairCenterRequest";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RecycleCompanies from "./screens/recycle/RecycleCompanies";
import ViewRecycleCompany from "./components/recycle/ViewRecycleCompany";
import DropOff  from "./screens/recycle/DropOff";
import ViewMyProduct from "./screens/ViewMyProduct";
import { LogBox } from 'react-native';
import PickUp from "./screens/recycle/PickUp";

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
  LogBox.ignoreLogs(['@firebase/auth']);
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
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="ViewMyProduct"
          component={ViewMyProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecycleRequests"
          component={RecycleRequests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewRecycleRequest"
          component={ViewRecycleRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RecycleCenterBottomNavBar"
            component={RCBottomNavBar}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="RecycleCenterHome"
            component={RecycleCenterHome}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="RecyclersMap"
            component={RecyclersMap}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="MapTest"
            component={MapTest}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="RecycleCollectionRequests"
            component={CollectionRequests}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="RecycleCollectionRoutes"
            component={CollectionRoutes}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="RecycleCenterProfile"
            component={RecycleCenterProfile}
            options={{headerShown: true}} 
        />
        <Stack.Screen
          name="RecycleCompanies"
          component={RecycleCompanies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewRecycleCompany"
          component={ViewRecycleCompany}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DropOff"
          component={DropOff}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickUp"
          component={PickUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

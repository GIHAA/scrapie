import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Search, Fav, Scan } from "../screens";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/index";
import { Entypo } from '@expo/vector-icons';
import Test from "../screens/Test";
import Test2 from "../screens/Test2";


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={React.memo(Search)}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"search-sharp"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="scan"
        component={React.memo(Scan)}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ backgroundColor: focused ? COLORS.primary : "#198155", padding: 18 , borderRadius: 50 }}>
              <Entypo
                name="camera"
                size={24}
                color="white"
              />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="fav"
        component={Fav}
        options={{
          tabBarIcon: ({ focused }) => {
            return (

              <Feather
                name={"heart"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

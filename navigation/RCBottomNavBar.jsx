import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapTest, RecycleCenterHome, RecyclersMap, CollectionRequests, CollectionRoutes, RecycleCenterProfile } from "../screens";
import {Ionicons, Feather, Entypo} from "@expo/vector-icons";
import { COLORS } from "../constants/index";

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

const RCBottomNavBar = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="RecycleCenterHome"
        component={RecycleCenterHome}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={30}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="RecyclersMap"
        component={RecyclersMap}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "location" : "location-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="CollectionRequests"
        component={CollectionRequests}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="direction"
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MapTest3"
        component={CollectionRoutes}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name={focused ? "check-circle" : "check"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
          name="RecycleCenterProfile"
          component={RecycleCenterProfile}
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

export default RCBottomNavBar;

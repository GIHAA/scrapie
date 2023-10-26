import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home, RecyclersMap} from "../screens";
import Ionicons from '@expo/vector-icons/Ionicons';
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
                                size={30}
                                color={focused ? COLORS.primary : COLORS.gray2}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Recyclers Map"
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
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
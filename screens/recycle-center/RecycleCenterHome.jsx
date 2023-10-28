import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";
import {
  Heading,
  MapGlimpse,
  SchedulesCarousel,
  Welcome,
} from "../../components";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const RecycleCenterHome = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const getCurrentLocation = async () => {};

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}></View>
      </View>
      <ScrollView>
        <Welcome />
        <MapGlimpse />
        <View style={styles.continer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}> Find anonymous recyclers near you!</Text>
          </View>
        </View>
        <SchedulesCarousel />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecycleCenterHome;

const styles = StyleSheet.create({
  testStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  continer: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.xxLarge,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
  },
  headerTitle: {
    fontFamily: "semibold",
  },
});

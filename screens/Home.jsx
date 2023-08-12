import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./home.style";
import { Ionicons , Fontisto } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headlng from "../components/home/Headlng";
import ProductRow from "../components/product/ProductRow";

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>

        </View>
      </View>

      <ScrollView>
          <Welcome />
          <Carousel />
          <Headlng />
          <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

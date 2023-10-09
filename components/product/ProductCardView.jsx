import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./productCardView.style";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ product }) => {
  const { item, seller, price, image, description, phone } = product;
  const navigation = useNavigation();

  const viewProduct = () => {
    const data = { image, seller, description, item, price, phone };

    navigation.navigate("ViewProduct", { data });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        viewProduct();
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {seller}
          </Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

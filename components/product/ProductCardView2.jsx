import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./productCardView2.style";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const ProductCardView2 = ({ product }) => {
  const { item, seller, price, image, description, phone, id } = product;
  const navigation = useNavigation();

  const viewProduct = () => {
    const data = { image, seller, description, item, price, phone, id };

    navigation.navigate("ViewMyProduct", { data });
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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {item}
            </Text>
            <Text style={styles.supplier} numberOfLines={1}>
              {seller}
            </Text>
            <Text style={styles.price}>
  {price ? `$${price}` : <Text style={{ color: 'green' }}>Free</Text>}
</Text>

          </View>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginRight: 10 }}
          ></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView2;

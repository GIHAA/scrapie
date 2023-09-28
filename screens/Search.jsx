import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductCardView2 from "../components/product/ProductCardView2";

const Search = () => {
  // Sample data for the FlatList
  const data = [
    { id: '1', name: 'Product 1', supplier: 'Supplier 1', price: 10.99, imageUri: 'https://picsum.photos/seed/696/3000/2000' },
    { id: '2', name: 'Product 2', supplier: 'Supplier 2', price: 19.99, imageUri: 'https://picsum.photos/seed/696/3000/2000' },
    { id: '3', name: 'Product 3', supplier: 'Supplier 3', price: 29.99, imageUri: 'https://picsum.photos/seed/696/3000/2000' },

  ];
  //const products = [1, 2, 3, 4 ,5 , 6, 8 , 8];

  // Render each item in the FlatList

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            placeholder="What are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data} // Assuming data contains product objects
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCardView2 product={item} />}
        numColumns={2}
        // style={{paddingHorizontal: 10}}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  // Style for each item in the FlatList
  flatListItem: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    margin: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    height: 150, // Adjust as needed
  },
  // Style for the container of the FlatList
  flatListContainer: {
    // Add styles for the FlatList container here if needed
  },
});

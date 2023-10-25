import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import ProductCardView from "../components/product/ProductCardView";
import ProductCardView2 from "../components/product/ProductCardView2";

const Search = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("marketplace");
  const [currentUserEmail, setCurrentUserEmail] = useState("gihan3@gmail.com"); // Replace with your authentication logic

  const getUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "items");
      const querySnapshot = await getDocs(usersCollectionRef);

      const userDataArray = [];

      querySnapshot.forEach((doc) => {
        const user = {
          id: doc.id,
          ...doc.data(),
        };
        userDataArray.push(user);
      });
      userDataArray.sort((a, b) => b.timestamp - a.timestamp);
      setUserData(userDataArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const auth = getAuth();
      if (auth.currentUser) {
        setCurrentUserEmail(auth.currentUser.email);
      }
    };

    fetchUserEmail();
    getUsersData();
  }, []);

  const filteredData = userData.filter((item) => {
    const itemName = item.item.toLowerCase();
    const itemUid = item.uid;
    const isMyItem = itemUid === currentUserEmail;
    return (
      itemName.includes(searchQuery.toLowerCase()) &&
      (view === "marketplace" || isMyItem)
    );
  });

  const renderMarketplaceView = () => (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCardView product={item} />}
      numColumns={2}
    />
  );

  const renderMyItemsView = () => (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCardView2 product={item} />}
      numColumns={2}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
                style={{
                  marginTop : 13,
                  backgroundColor: COLORS.primary,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  marginHorizontal : 20
                }}
        onPress={() =>
          setView(view === "marketplace" ? "myItems" : "marketplace")
        }
      >
        <Text style={{ color: "white", fontSize: 20 }}>{`Switch to ${
          view === "marketplace" ? "My Items" : "Marketplace"
        }`}</Text>
      </TouchableOpacity>

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
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="What are you looking for"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          fontFamily: "semibold",
          fontSize: SIZES.xLarge - 2,
          marginLeft: 8,
        }}
      >
        {view === "marketplace" ? "Marketplace" : "My Items"}
      </Text>

      <View style={styles.flatListContainer}>
        {view === "marketplace" ? renderMarketplaceView() : renderMyItemsView()}
      </View>
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
  flatListContainer: {
    flex: 1,
    alignItems: "center",
  },
});

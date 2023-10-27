import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import RecycleRequestCardView from "../../components/recycle/RecycleRequestCardView";
import AppBar from "../../components/recycle/AppBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { SegmentedButtons } from "react-native-paper";

const RecycleRequests = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState("Pick_Up");

  const getUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "recycleRequests");

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
      console.log("userDataArray", userDataArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const filteredData = userData.filter((item) => {
    const itemName = item?.recycleItem?.item?.toLowerCase();
    const itemType = item?.recycleRequest?.type;
      return (
      itemType === value &&
      itemName?.includes(searchQuery?.toLowerCase())
    );
  });

  return (
    <SafeAreaView>
      <AppBar title={"Recycle Requests"}></AppBar>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.white,
          borderColor: COLORS.gray,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginHorizontal: 10,
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <TextInput
          style={{ flex: 1, paddingVertical: 10, color: COLORS.black }}
          placeholder="Search"
          placeholderTextColor={COLORS.black}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={{ padding: 10 }}>
          <Icon name="search" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "Pick_Up",
            label: "Pick Ups",
          },
          {
            value: "Drop_Off",
            label: "Drop Offs",
          },
        ]}
        theme={{
          colors: {
            primary: COLORS.primary,
            onPrimary: COLORS.primary,
            primaryContainer: COLORS.primary,
            onPrimaryContainer: COLORS.primary,
            secondary: COLORS.primary,
            onSecondary: COLORS.primary,
            secondaryContainer: COLORS.primary,
            underlineColor: COLORS.primary,
            tertiary: COLORS.primary,
            background: COLORS.primary,
          },
          marginTop: 20,
        }}
        style={{marginTop: 20, marginLeft: 20, marginRight: 20, color: COLORS.primary}}
      />

      <View>
        <FlatList
          style={styles.container}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecycleRequestCardView recycleRequest={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecycleRequests;

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
  flatListItem: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    margin: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  flatListContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    margin: 5,
  },
});

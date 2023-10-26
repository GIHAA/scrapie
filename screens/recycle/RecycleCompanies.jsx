import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import RecycleCompanyCardView from "../../components/recycle/RecycleCompanyCardView";
import AppBar from "../../components/recycle/AppBar";
import Icon from 'react-native-vector-icons/FontAwesome';

const RecycleCompanies = ({ route }) => {
  const { recycleItem } = route.params;

  console.log("RecycleCompanies Screen Data", recycleItem);
  
  const [companyData, setCompanyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCompanyData = async () => {
    try {
      const companiesCollectionRef = collection(db, "recycleCompanies");

      const querySnapshot = await getDocs(companiesCollectionRef);

      const companyDataArray = [];

      querySnapshot.forEach((doc) => {
        const company = {
          id: doc.id,
          ...doc.data(),
        };
        companyDataArray.push(company);
      });
      companyDataArray.sort((a, b) => b.timestamp - a.timestamp);
      setCompanyData(companyDataArray);
      console.log("companyDataArray", companyDataArray);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const filteredData = companyData.filter((company) => {
    const name = company.name.toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });
  return (
    <SafeAreaView>
    <AppBar title={"Recycle Partners"}></AppBar>
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
    

      <View >
        <FlatList
          style={styles.container}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecycleCompanyCardView recycleCompany={item} recycleItem={recycleItem} />
          )}
        />
      </View>

    </SafeAreaView>
  );
};

export default RecycleCompanies;

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
  }
});

import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./ProductRow.style";
import { SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const ProductRow = () => {
  const [userData, setUserData] = useState([]);

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
      setUserData(userDataArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <View style={{ marginTop: 3 , marginBottom : 80 , marginLeft : 10}}>
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCardView product={item} />}
        horizontal
      />
    </View>
  );
};

export default ProductRow;

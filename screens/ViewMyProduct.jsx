import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Linking } from "react-native";
import { COLORS } from "../constants";
import {  collection, doc , getFirestore, update , deleteDoc } from "firebase/firestore";// Import your Firebase configuration here
import { db } from "../firebase.config";

const ViewMyProduct = ({ route, navigation }) => {
  const { data } = route.params;
  const firestore = getFirestore();

  const markAsSold = () => {
    // Get a reference to the Firestore document
    const itemRef = doc(firestore, "items", data.id); // Replace "your-collection-name" with your actual collection name

  update(itemRef, { status: "sold" })
      .then(() => {
      })
      .catch((error) => {
        console.error("Error marking item as sold:", error);
      });
  };

  const deleteItem = async () => {
    try {
    await deleteDoc(doc(db, "items", data.id));
    console.log("Item deleted successfully!");
    } catch (error) {
     console.error("Error deleting item:", error);
   }
  };
  

  return (
<View>
      <Image
        animation="fadeIn"
        duration={1000}
        style={{ height: "55%", width: "100%" }}
        source={{
          uri: data.image,
        }}
        placeholder="image"
        contentFit="cover"
      />

      <View style={{ backgroundColor: COLORS.white, height: "50%" }}>
        <View style={{ marginLeft : 10 , marginRight : 10}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              paddingTop: 15,
              paddingBottom: 15,
              borderRadius: 40,
            }}
          >
            {data.item}
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            Price : <Text style={{ fontWeight: "500" }}>{data.price}</Text>
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Description :{" "}
            <Text style={{ fontWeight: "500" }}>{data.description}</Text>
          </Text>


      <TouchableOpacity
        style={{
          marginTop: 13,
          backgroundColor: COLORS.primary,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
        onPress={markAsSold}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Mark as sold</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 13,
          backgroundColor: "#e75e00",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
        onPress={deleteItem}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Delete item</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewMyProduct;

const styles = StyleSheet.create({});

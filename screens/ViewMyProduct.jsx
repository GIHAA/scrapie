import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { COLORS } from "../constants";
import {
  collection,
  doc,
  getFirestore,
  update,
  deleteDoc,
} from "firebase/firestore"; // Import your Firebase configuration here
import { db } from "../firebase.config";
import ModalPopUp from "../components/repair/ModalPopup";
import Icon from "react-native-vector-icons/FontAwesome";

const ViewMyProduct = ({ route, navigation }) => {
  const { data } = route.params;
  const firestore = getFirestore();

  const markAsSold = () => {
    // Get a reference to the Firestore document
    const itemRef = doc(firestore, "items", data.id); // Replace "your-collection-name" with your actual collection name

    update(itemRef, { status: "sold" })
      .then(() => {})
      .catch((error) => {
        console.error("Error marking item as sold:", error);
      });
  };

  const deleteItem = async (data) => {
    console.log("www");
    try {
      await deleteDoc(doc(db, "items", data.id));
      console.log("Item deleted successfully!");
      setSuccess(true)
      setTimeout(() => {
        navigation.navigate("Bottom Navigation");
      }, 3000); 
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);

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
        <View style={{ marginLeft: 10, marginRight: 10 }}>
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
            onPress={() => {setIsModalVisible(true)}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Delete item</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalPopUp visible={isModalVisible}>
        <View>
          {success ? (
            <View>
              <Icon
                name="check"
                style={styles.icon}
                size={120}
                color={COLORS.primary}
              />
            <Text style={{ fontSize : 20}}>
            Item deleted successfully!
              </Text>
               </View>
          ) : (
            <View>
              <Icon
                name="times"
                style={styles.icon}
                size={120}
                color={COLORS.red}
              />
              <Text style={styles.failedPopUpTitle}></Text>
              <Text style={{ fontSize : 20}}>
              Are you sure you want to delete this post?
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={{
              marginTop: 13,
              backgroundColor: COLORS.primary,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              marginHorizontal: 20,
            }}
            onPress={() => {deleteItem(data)}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ModalPopUp>
    </View>
  );
};

export default ViewMyProduct;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "40%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  icon: {
    textAlign: "center",
  },
  buttonSuccess: {
    backgroundColor: COLORS.primary,
  },
  buttonFail: {
    backgroundColor: COLORS.red,
  },
});

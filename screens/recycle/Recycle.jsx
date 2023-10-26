import React, { useState , useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { COLORS } from "../../constants";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {  collection , query , where , getDocs , addDoc} from "firebase/firestore";
import * as Animatable from "react-native-animatable";
import { Modal } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Recycle = ({ route }) => {

const { recycleItem = { item: "Shoes", image: "https://picsum.photos/200/300" }} = route.params;

  console.log("Recycle Screen Data", recycleItem);
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [isConfirmVisible, setisConfirmVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [user , setUser] = useState({})
 

  const updateDescription = (value) => {
    setDescription(value);
  };

  const updateType = (value) => {
    setType(value);
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;

        const usersCollection = collection(db, "users");
        const userQuery = query(
          usersCollection,
          where("email", "==", userEmail)
        );

        getDocs(userQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const userData = userDoc.data();

              setUser(userData)
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });

    return unsubscribe;
  }, []);


  const handleButtonPress = () => {
    recycleItem.type = type;
    recycleItem.description = description;    
    navigation.navigate("RecycleCompanies", {recycleItem});
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    
          <View style={{ flex: 1, margin: 20, marginTop: 80 }}>
            <Text style={{ fontSize: 38, fontWeight: "bold" }}>
              Recycle {recycleItem.item}{" "}
            </Text>

            <TextInput
              label="Type"
              mode="outlined"
              value={type}
              multiline
              onChangeText={(text) => updateType(text)}
              style={styles.input}
            />

            <TextInput
              label="Description"
              mode="outlined"
              value={description}
              multiline
              onChangeText={(text) => updateDescription(text)}
              style={styles.input}
            />
          </View>     
      </ScrollView>

      <View>
          <TouchableOpacity
            onPress={() => {
              handleButtonPress();
            }}
            style={{    margin: 20,
              backgroundColor: type && description? COLORS.primary : 'gray',
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50}}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Find a Recycling Center </Text>
          </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}></ScrollView>
          </View>

          <View
            style={{
              backgroundColor: "white",
              height: 150,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 50,
                  position: "absolute",
                  top: -50,
                }}
              >
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("Scan");
              }}
              style={styles.button}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Go to home page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

export default Recycle;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
  },
  button: {
    margin: 20,
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
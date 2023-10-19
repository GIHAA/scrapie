import React, { useState , useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { COLORS } from "../constants";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {  collection , query , where , getDocs , addDoc} from "firebase/firestore";
import * as Animatable from "react-native-animatable";
import { Modal } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Reuse = ({ route }) => {
  const { data } = route.params;
    const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isConfirmVisible, setisConfirmVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [user , setUser] = useState({})
 

  const updateDescription = (value) => {
    setDescription(value);
  };

  const updatePrice = (value) => {
    setPrice(value);
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
    setIsModalVisible(true);

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

              const usersCollection = collection(db, "items");
  
              const itemWithUID = {
                ...data,
                uid: userData.email,
                seller: userData.name,
                phone: userData.phone,
                description: description,
                price: selectedOption === "Option2" ? parseFloat(price) : null,
                timestamp: new Date().toISOString(),
              };
          
              if (selectedOption) {
                setisConfirmVisible(true);
            
                addDoc(usersCollection, itemWithUID)
                  .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    setIsSuccess(true);
                    setIsAnimationPlaying(true);
                  })
                  .catch((error) => {
                    setIsFail(true);
                    setIsAnimationPlaying(true);
                    console.error("Error adding document: ", error);
            
                    if (error.code === "permission-denied") {
                      Alert.alert("Permission denied. Please check your Firebase rules.");
                    } else {
                      Alert.alert("An error occurred while connecting to the server.");
                    }
                  });
            
                if (selectedOption === "Option2") {
                }
                } else {
                  Alert.alert("Please select an option first.");
                }


            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });


    // const usersCollection = collection(db, "items");
  
    // const itemWithUID = {
    //   ...data,
    //   uid: user.uid,
    //   seller: user.name,
    //   phone: user.phone,
    //   description: description,
    //   price: selectedOption === "Option2" ? parseFloat(price) : null,
    // };

    // if (selectedOption) {
    //   setisConfirmVisible(true);
  
    //   addDoc(usersCollection, itemWithUID)
    //     .then((docRef) => {
    //       console.log("Document written with ID: ", docRef.id);
    //       setIsSuccess(true);
    //       setIsAnimationPlaying(true);
    //     })
    //     .catch((error) => {
    //       setIsFail(true);
    //       setIsAnimationPlaying(true);
    //       console.error("Error adding document: ", error);
  
    //       if (error.code === "permission-denied") {
    //         Alert.alert("Permission denied. Please check your Firebase rules.");
    //       } else {
    //         Alert.alert("An error occurred while connecting to the server.");
    //       }
    //     });
  
    //   if (selectedOption === "Option2") {
    //   }
    //   } else {
    //     Alert.alert("Please select an option first.");
    //   }
  };
  

  const closeModal = () => {
    setisConfirmVisible(false);
  };

  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isConfirmVisible ? (
          <View style={{ flex: 1, margin: 20, marginTop: 80 }}>
            <Text style={{ fontSize: 38, fontWeight: "bold" }}>
              Give away {data.item}{" "}
              {selectedOption === "Option1" ? "for free" : ""}
              {selectedOption === "Option2" ? "for a price" : ""}
            </Text>

            <View style={{ marginTop: 20 }}>
              <View style={styles.radioButtonContainer}>
                <Text style={{ fontSize: 22 }}>Give away for free</Text>
                <RadioButton
                  value="Option1"
                  status={
                    selectedOption === "Option1" ? "checked" : "unchecked"
                  }
                  onPress={() => setSelectedOption("Option1")}
                />
              </View>

              <View style={styles.radioButtonContainer}>
                <Text style={{ fontSize: 22 }}>
                  Give away for a small price
                </Text>
                <RadioButton
                  value="Option2"
                  status={
                    selectedOption === "Option2" ? "checked" : "unchecked"
                  }
                  onPress={() => setSelectedOption("Option2")}
                />
              </View>
            </View>

            {selectedOption === "Option2" && (
              <View>
                <TextInput
                  label="Price"
                  mode="outlined"
                  value={price}
                  onChangeText={(text) => updatePrice(text)}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            )}

            <TextInput
              label="Description"
              mode="outlined"
              value={description}
              multiline
              onChangeText={(text) => updateDescription(text)}
              style={styles.input}
            />
          </View>
        ) : (
          <View style={{ flex: 1, margin: 20, marginTop: 80 }}>
            <Text style={{ fontSize: 38, fontWeight: "bold" }}>
              Confirm listing
            </Text>

            <Animatable.Image
              animation="fadeIn"
              duration={1000}
              style={{ height: "40%", width: "100%", marginTop: 40 }}
              source={{
                uri: data.image || "https://picsum.photos/seed/696/3000/2000",
              }}
              placeholder="image"
              contentFit="cover"
            />

            <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
              {data.item}{" "}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
              Price : <Text style={{ fontWeight: "500" }}>{price}</Text>
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
              Description :{" "}
              <Text style={{ fontWeight: "500" }}>{description}</Text>
            </Text>
          </View>
        )}
      </ScrollView>

      <View>
        {isConfirmVisible ? (
          <TouchableOpacity
            onPress={() => {
              setisConfirmVisible(false);
            }}
            style={{    margin: 20,
              backgroundColor: selectedOption && description ? COLORS.primary : 'gray',
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50}}
            disabled={!selectedOption || !description || !price}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Proceed</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleButtonPress();
            }}
            style={{    margin: 20,
              backgroundColor: selectedOption ? COLORS.primary : 'gray',
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50}}
            disabled={!selectedOption}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Post item</Text>
          </TouchableOpacity>
        )}
      </View>

      
{/* <View>
  <TouchableOpacity
    onPress={() => {
      if (selectedOption) {
        setisConfirmVisible(false);
      }
    }}
    style={{
      margin: 20,
      backgroundColor: selectedOption ? COLORS.primary : 'gray', // Set background color based on selectedOption
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    }}
    disabled={!selectedOption}
  >
    <Text style={{ color: 'white', fontSize: 20 }}>Proceed</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      if (selectedOption) {
        handleButtonPress();
      }
    }}
    style={{
      margin: 20,
      backgroundColor: selectedOption ? COLORS.primary : 'gray', // Set background color based on selectedOption
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    }}
    disabled={!selectedOption}
  >
    <Text style={{ color: 'white', fontSize: 20 }}>Post item</Text>
  </TouchableOpacity>
</View> */}


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
                {isSuccess && (
                  <Video
                    source={require("../assets/video/check.mp4")}
                    shouldPlay={isAnimationPlaying}
                    resizeMode="cover"
                    style={{ width: 150, height: 150, borderRadius: 100 }}
                  />
                )}

                {isFail && (
                  <Video
                    source={require("../assets/video/uncheck.mp4")}
                    shouldPlay={isAnimationPlaying}
                    resizeMode="cover"
                    style={{ width: 150, height: 150, borderRadius: 100 }}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("Home");
              }}
              style={styles.button}
              disabled={!selectedOption}
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

export default Reuse;

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

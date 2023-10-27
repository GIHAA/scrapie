import { Calendar } from "react-native-calendars";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { COLORS } from "../../constants";
import "firebase/auth";
import "firebase/firestore";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import * as Animatable from "react-native-animatable";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppBar from "../../components/recycle/AppBar";

const DropOff = ({ route }) => {
  const { recycleCompany, recycleItem, recycleRequest } = route.params;

  console.log("View dropOff Screen company", recycleCompany);
  console.log("View dropOff Screen item", recycleItem);
  console.log("View dropOff request", recycleRequest);

  const navigation = useNavigation();

  const [selectedDay, setSelectedDay] = useState("2023-10-29");
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Confirmation, setConfirmation] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState({});
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

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

              setUser(userData);
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
    recycleRequest.date = selectedDay;
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

              setUser(userData);

              const usersCollection = collection(db, "recycleRequests");

              const itemWithUID = {
                recycleCompany: recycleCompany,
                recycleItem: recycleItem,
                recycleRequest: recycleRequest,
                uid: userData.email,
                seller: userData.name,
                phone: userData.phone,
                timestamp: new Date().toISOString(),
              };

              setConfirmation(false);

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
                    Alert.alert(
                      "Permission denied. Please check your Firebase rules."
                    );
                  } else {
                    Alert.alert(
                      "An error occurred while connecting to the server."
                    );
                  }
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0efeb" }}>
      <AppBar title={"Drop Off"}></AppBar>
      {Confirmation ? (
        <View style={{ flex: 1, margin: 20, marginTop: 80 }}>
          <Text style={{ fontSize: 38, fontWeight: "bold" }}>
            Confirm listing
          </Text>

          <Animatable.Image
            animation="fadeIn"
            duration={1000}
            style={{ height: "40%", width: "100%", marginTop: 40 }}
            source={{
              uri:
                recycleItem.image || "https://picsum.photos/seed/696/3000/2000",
            }}
            placeholder="image"
            contentFit="cover"
          />

          <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
            {recycleItem.item}{" "}
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Price :{" "}
            <Text style={{ fontWeight: "500" }}>{recycleCompany.name}</Text>
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Description :{" "}
            <Text style={{ fontWeight: "500" }}>{recycleRequest.type}</Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              handleButtonPress();
            }}
            style={{
              margin: 20,
              backgroundColor: selectedDay ? COLORS.primary : "gray",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ marginTop: 100 }}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/Schedule-sis.png")}
              style={styles.image}
            />
          </View>
          <Calendar
            initialDate={selectedDay}
            minDate={new Date()}
            enableSwipeMonths={true}
            onDayPress={(day) => {
              setSelectedDay(day.dateString);
            }}
            // Specify style for calendar container element. Default = {}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              height: 350,
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "#198155",
              selectedDayTextColor: "#198155",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#00000",
              arrowColor: "green",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "green",
              indicatorColor: "green",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          <View
            style={{
              backgroundColor: COLORS.primary,
              padding: 20,
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 20 }}>{selectedDay}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#f0efeb", padding: 20 }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setConfirmation(true);
                }}
                style={{
                  margin: 20,
                  backgroundColor: selectedDay ? COLORS.primary : "gray",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Schedule a Drop Off
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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
                    source={require("../../assets/video/check.mp4")}
                    shouldPlay={isAnimationPlaying}
                    resizeMode="cover"
                    style={{ width: 150, height: 150, borderRadius: 100 }}
                  />
                )}

                {isFail && (
                  <Video
                    source={require("../../assets/video/uncheck.mp4")}
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

export default DropOff;

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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
    minHeight: 200,
  },
  image: {
    width: 200,
    height: 200,
  },
});

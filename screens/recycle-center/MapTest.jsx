import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { COLORS } from "../../constants";
import { getDistance } from "./getDistance";
import { ResizeBilinearGrad } from "@tensorflow/tfjs";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { async } from "@firebase/util";

function MapTest({ route, navigation }) {
  const GOOGLE_API_KEY = "AIzaSyCWiOaJO60oKRaaWoiBU2X8_J-cTSRt5eU";
  const [currLati, setCurrLat] = useState(7.25184587048);
  const [currLongi, setCurrLongi] = useState(80.3456412507);
  const [confirmedScehdule, setConfirmedScehdule] = useState(false);
  const [successfulSchedule, setSuccessfulSchedule] = useState(false);
  const { coordinates, from } = route.params;
  const distanceMatrixResult = {
    destination_addresses: ["21000 W 10 Mile Rd, Southfield, MI 48075, USA"],
    origin_addresses: ["555 E Lafayette St, Detroit, MI 48226, USA"],
    rows: [
      {
        elements: [
          {
            distance: { text: "27.6 km", value: 27632 },
            duration: { text: "21 mins", value: 1246 },
            status: "OK",
          },
        ],
      },
    ],
    status: "OK",
  };

  function navigationButtonPressed({ buttonId }) {
    if (buttonId === "RNN.back") {
      alert("The software back button was pressed!");
    }
  }

  const [recycleRequests, setRecycleRequests] = useState([]);
  const fetchRecycleRequests = async () => {
    try {
      const recycleRequestsCollRef = collection(db, "recycleRequests");
      const querySnapshot = await getDocs(recycleRequestsCollRef);

      const requestsArray = [];
      querySnapshot.forEach((doc) => {
        const request = {
          id: doc.id,
          ...doc.data(),
        };
        requestsArray.push(request);
      });
      setRecycleRequests(requestsArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchRecycleRequests();
  }, []);

  const [distanceMatrix, setDistanceMatrix] = useState(false);
  const routeMatrix = async () => {
    console.log("routeMatrix");
    setDistanceMatrix(true);
    const tranformedCoordinates = coordinates.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
    console.log(tranformedCoordinates);
    const origin = {
      origins: [tranformedCoordinates[0]],
      destinations: [tranformedCoordinates[tranformedCoordinates.length - 1]],
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now() + 6000),
        trafficModel: "optimistic",
      },
    };
    const res = await getDistance(origin);
    console.log("res- ", res);
    // setDistanceMatrixResult(res);
  };

  const handleConfirmSchedule = async () => {
    setConfirmedScehdule(true);
    const recycleRoutesCollection = collection(db, "recycleRoutes");

    addDoc(recycleRoutesCollection, distanceMatrixResult)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setSuccessfulSchedule(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);

        if (error.code === "permission-denied") {
          Alert.alert("Permission denied. Please check your Firebase rules.");
        } else {
          Alert.alert("An error occurred while connecting to the server.");
        }
      });
  };

  const handleCancel = () => {
    navigation.navigate("CollectionRequests");
    setDistanceMatrix(false)
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {false &&
          recycleRequests.length > 0 &&
          recycleRequests.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(data.recycleRequest.location.latitude),
                longitude: parseFloat(data.recycleRequest.location.longitude),
              }}
              title={`Marker ${index + 1}`}
              description={`Weight: ${data.weight}`}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{data.recycleItem.item}</Text>
                    <Text style={styles.name}>
                      {data.recycleItem.description}
                    </Text>
                    <Image
                      style={styles.image}
                      source={require("../../assets/images/plastic_bottles.jpeg")}
                    />
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <Marker coordinate={coordinates[2]} />
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeColors={["#7F0000"]}
          strokeWidth={6}
        />
      </MapView>
      <TouchableOpacity
        style={{
          backgroundColor: "#198155",
          padding: 10,
          margin: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 50,
        }}
        onPress={routeMatrix}
      >
        <View>
          <Text>Calculate distance</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={distanceMatrix}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDistanceMatrix(!distanceMatrix);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!confirmedScehdule ? (
              <>
                <Text style={styles.modalText}>
                  Distance:
                  {distanceMatrixResult.rows[0].elements[0].distance.text}
                </Text>
                <Text style={styles.modalText}>
                  Duration:
                  {distanceMatrixResult.rows[0].elements[0].duration.text}
                </Text>
                <Text style={styles.modalText}>
                  No. of Pick-ups: {coordinates.length}
                </Text>
                <Text style={styles.modalText}>Location: Kegalle</Text>
                <Text style={styles.modalText}>
                  Scheduled Date: {new Date().toString().split("2023")[0]}2023
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleConfirmSchedule}
                >
                  <Text style={styles.textStyle}>Confirm Schedule</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.closeBtn]}
                  onPress={() => setDistanceMatrix(!distanceMatrix)}
                >
                  <Text style={styles.textStyle}>Go Back</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.modalText}>
                  {!successfulSchedule
                    ? "Confirming your Schedule"
                    : "Confirmed"}
                </Text>
                <Pressable
                  style={[styles.button, styles.closeBtn]}
                  onPress={handleCancel}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeBtn: {
    marginTop: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS.red,
  },
  buttonClose: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MapTest;

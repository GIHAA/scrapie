import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import MapView, { Callout, Marker } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

function CollectionRequests() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [types, setTypes] = useState([
    "All",
    "e-waste",
    "Plastic",
    "Bio-degradables",
    "Paper",
  ]);
  const [selectedItem, setSelectedItem] = useState(types[0]);
  const [requests, setRequests] = useState([]);
  const [currLati, setCurrLat] = useState(7.25184587048);
  const [currLongi, setCurrLongi] = useState(80.3456412507);

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
      setRequests(requestsArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchRecycleRequests();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  const handleListPress = () => {
    setIsListView(true);
  };
  const handleMapPress = () => {
    setIsListView(false);
  };
  return (
    <>
      <SafeAreaView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "400",
              color: COLORS.black,
              fontFamily: "normal",
            }}
          >
            Pick-Up Requests
          </Text>
        </View>

        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                },
              ]}
              onPress={toggleDropdown}
            >
              <Text style={styles.buttonText}>{selectedItem}</Text>
              <Entypo name="chevron-thin-down" size={24} color="black" />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isDropdownOpen}
              onRequestClose={toggleDropdown}
            >
              <View style={styles.modalContainer}>
                <ScrollView style={styles.modalScrollView}>
                  {types.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => selectItem(item)}
                    >
                      <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <TouchableOpacity onPress={handleListPress}>
            <Ionicons
              name={isListView ? "list-circle" : "list"}
              size={isListView ? 40 : 30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMapPress}>
            <Ionicons
              name={!isListView ? "map" : "map-outline"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.buttonText, { marginLeft: 20 }]}>
            You have {requests.length} pick up requests
          </Text>
        </View>

        {requests.length > 0 ? (
          isListView ? (
            <View style={{ marginTop: 10 }}>
              <ScrollView>
              <FlatList
                data={requests}
                keyExtractor={(request) => request.id}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity key={item.id} style={styles.card}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              styles.cardText,
                              { fontSize: 24, fontWeight: "500" },
                            ]}
                          >
                            {item.recycleItem.item}
                          </Text>
                          <Text style={styles.cardText}>
                            description: {item.recycleItem.description}
                          </Text>
                          <Text style={styles.cardText}>
                            Requested By: {Date().toString().split("2023")[0]}
                            2023
                          </Text>
                          <Text style={styles.cardText}>
                            requested by: {item.seller}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.image}
                            source={require("../../assets/images/plastic_bottles.jpeg")}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                numColumns={1}
              />
              </ScrollView>
            </View>
          ) : (
            <View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currLati,
                  longitude: currLongi,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}
              >
                {requests.length > 0 &&
                  requests.map((data, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: parseFloat(
                          data.recycleRequest.location.latitude
                        ),
                        longitude: parseFloat(
                          data.recycleRequest.location.longitude
                        ),
                      }}
                      title={`Marker ${index + 1}`}
                      description={`Weight: ${data.weight}`}
                    >
                      <Callout tooltip>
                        <View>
                          <View style={styles.bubble}>
                            <Text style={styles.name}>
                              {data.recycleItem.item}
                            </Text>
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
              </MapView>
            </View>
          )
        ) : null}
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  dropdownButton: {
    width: 250,
    height: 40,
    borderRadius: 5,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0.2,
  },
  buttonText: {
    fontSize: 14,
  },
  modalContainer: {
    marginTop: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalScrollView: {
    maxHeight: 150,
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  itemText: {
    fontSize: 16,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 20,
  },
  card: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 15,
    padding: 10,
    paddingLeft: 15,
    flexDirection: "column",
    shadowColor: COLORS.green,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.22,
    elevation: 2,
    backgroundColor: COLORS.lightWhite,
  },
  cardText: {
    color: COLORS.black,
    fontSize: 20,
  },
  map: {
    width: "90%",
    height: "85%",
    margin: 20,
    marginTop: 10,
  },
  image: {
    resizeMode: "cover",
    height: 200,
    width: 300,
    margin: 10,
  },
});
export default CollectionRequests;

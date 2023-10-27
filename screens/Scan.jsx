import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import axios from "axios";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/index";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { storage } from "../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Test from "./Test";

const Scan = ({}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [displayCameraButtom, setdisplayCameraButtom] = useState(true);
  const [displayItemDetails, setDisplayItemDetails] = useState(false);
  const [target, setTarget] = useState([{ className: "Computer mouse" }]);
  const [image, setImage] = useState();
  const [raw, setRaw] = useState();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotes = [
    "Recycle your aluminum cans, and save energy while reducing waste.",
    "Don't forget to separate your paper for recycling to help save trees.",
    "Always recycle glass bottles and jars to reduce pollution and conserve resources.",
    "Collect steel items for recycling to make an energy-saving impact.",
    "Recycle plastic bottles to save energy and reduce plastic pollution.",
    "Be sure to recycle glass bottles to brighten the world and save energy.",
    "When upgrading your electronics, recycle the old ones to recover valuable materials.",
    "Flatten cardboard boxes before recycling to save space and resources.",
    "Dispose of old cell phones responsibly through e-waste recycling programs.",
    "Aluminum is a valuable resource, so make sure to recycle your aluminum items.",
    "Recycle as much as possible to reduce your carbon footprint and combat climate change.",
    "When it's time to replace a car battery, recycle the old one to protect the environment.",
    "Did you know that one recycled aluminum can saves enough energy to power a TV for three hours?",
    "Paper recycling is like a superhero – saving 17 trees per ton of paper!",
    "Glass recycling is a clean superhero, reducing air pollution by 20% and water pollution by 50%.",
    "Recycling 100 pounds of steel is like powering a home for two months – that's impressive!",
    "Your plastic bottle recycling conserves energy equivalent to powering a computer for 25 minutes!",
    "Just one glass bottle saves enough energy to light a room for four hours!",
    "Recycling electronics is like treasure hunting, recovering valuable metals like gold, silver, and copper.",
    "Cardboard recycling is a space-saver, saving over 9 cubic yards of landfill space for every ton.",
    "Recycling old cell phones is a win for wildlife, as it reduces the need for mining materials like coltan that can harm gorilla habitats.",
    "Aluminum recycling is a low-energy hero, using only 5% of the energy needed to create new aluminum.",
    "Recycling is a climate change warrior, reducing greenhouse gas emissions and helping the planet.",
    "Recycling car batteries is a life-saver, preventing harmful lead and acid from harming the environment."
  ];
  

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuoteIndex(randomIndex)
    }, 3900);

    return () => clearInterval(timer);
  }, [currentQuoteIndex]);

  useEffect(() => {
    const askCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };

    askCameraPermission();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const resetAll = () => {
    navigation.navigate("scan");
  };

  const uploadImageToFirebase = async (uri) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, "images/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              const data = {
                item: target[0].className.split(",")[0],
                image: downloadURL,
              };
              resolve(data); 
            } catch (error) {
              reject(error);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  const uploadImageToFirebaseRecycle = async (uri) => {
    const response = await fetch(uri);

    const blob = await response.blob();

    const storageRef = ref(storage, "images/" + new Date().getTime());

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const transferObj = {
            item: target[0].className.split(",")[0],
            image: downloadURL,
          };
          navigation.navigate("Recycle", { transferObj });
        });
      }
    );
  };
  const getPicFromGallery = async () => {
    setloading(true);
    setdisplayCameraButtom(false);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      const resizedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.8 }
      );

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("image", {
          uri: resizedImage.uri,
          type: "image/jpeg",
          name: "image.jpg",
        });

        setImage(resizedImage.uri);

        const response = await fetch(
          "https://scrapie-5g3h.onrender.com/predict",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseData = await response.json();

        setTarget(responseData);

        if (Array.isArray(responseData) && responseData.length > 0) {
          let message = "";

          responseData.forEach((item) => {
            if (item.className && item.probability) {
              message += `Class: ${item.className}\nProbability: ${item.probability}\n\n`;
            } else {
              message += "Invalid data format in response.\n\n";
            }
          });

          if (message.length > 0) {
            setloading(false);
            setDisplayItemDetails(true);
          } else {
            setloading(false);
            const errorMessage = "No valid data found in response.";
            Alert.alert("Bad Request", errorMessage);
          }
        } else {
          setloading(false);
          const errorMessage = "No valid response data from API.";
          Alert.alert("Bad Request", errorMessage);
        }
      }
    } catch (error) {
      setloading(false);
      console.error("Error selecting image and making API call:", error);
    }
  };

  const onCameraPress = async () => {
    setloading(true);
    setdisplayCameraButtom(false);
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        const resizedImage = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.8 }
        );
        setImage(resizedImage.uri);
        setRaw(photo.uri);

        const formData = new FormData();
        formData.append("image", {
          uri: resizedImage.uri,
          type: "image/jpeg",
          name: "image.jpg",
        });

        const response = await fetch(
          "https://scrapie-5g3h.onrender.com/predict",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseData = await response.json();

        setTarget(responseData);

        if (Array.isArray(responseData) && responseData.length > 0) {
          let message = "";

          responseData.forEach((item) => {
            if (item.className && item.probability) {
              message += `Class: ${item.className}\nProbability: ${item.probability}\n\n`;
            } else {
              message += "Invalid data format in response.\n\n";
            }
          });

          if (message.length > 0) {
            setDisplayItemDetails(true);
            setloading(false);
          } else {
            setloading(false);
            const errorMessage = "No valid data found in response.";
            Alert.alert("Bad Request", errorMessage);
          }
        } else {
          setloading(false);
          const errorMessage = "No valid response data from API.";
          Alert.alert("Bad Request", errorMessage);
        }
      } catch (error) {
        setloading(false);
        console.error("Error taking picture and making API call:", error);
      }
    }
  };

  const checkapi = async () => {
    try {
      const response = await axios.get("https://scrapie-5g3h.onrender.com/hi");
      console.log("GET Response:", response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const handleButtonClick = () => {
    navigation.navigate(Test);
  };

  const handleRepairButtonClick = async () => {
    const ImageUpload = await uploadImageToFirebase(image);
    const data = { item: target[0].className.split(",")[0], image: ImageUpload.image };
    navigation.navigate("Repair", { data });
  };

  const handleReuseButtonClick = async () => {
    try {
      const data = await uploadImageToFirebase(image);
      navigation.navigate("Reuse", { data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecycleButtonClick = () => {
    uploadImageToFirebaseRecycle(image);
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to the camera</Text>;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Camera
          style={{ flex: 1, marginBottom: 70 }}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
          onCameraReady={handleCameraReady}
        >
          {loading && (
            <View
              style={{
                flex: 1,
                marginTop: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size={100}
                color={COLORS.secondary}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
              <Animatable.Text
                animation="fadeIn"
                duration={1000}
                iterationCount={1}
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  marginHorizontal : 30,
                  color: COLORS.white,
                }}
              >
                {quotes[currentQuoteIndex]}
              </Animatable.Text>
            </View>
          )}

          {displayItemDetails && (
            <View
              animation="fadeIn"
              duration={1000}
              style={{
                // position: "absolute",
                backgroundColor: COLORS.secondary,
                paddingTop: 40,
              }}
            >
              <Animatable.Image
                animation="fadeIn"
                duration={1000}
                style={{ height: isExpanded ? "56%" : "37%", width: "100%" }}
                source={{
                  uri: image || "https://picsum.photos/seed/696/3000/2000",
                }}
                placeholder="image"
                contentFit="cover"
              />
              <View style={{ backgroundColor: COLORS.white, height: "100%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        paddingTop: 15,
                        borderRadius: 40,
                        maxWidth: 300,
                      }}
                    >
                      {target[0].className
                        .split(",")[0]
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        paddingBottom: 15,
                        borderRadius: 40,
                        maxWidth: 300,
                        flexDirection: "row",
                      }}
                    >
                      Confidence Level
                      <Text
                        style={{
                          color:
                            target[0].probability > 0.7
                              ? "#08ac00"
                              : target[0].probability > 0.5
                              ? "#f0ac37"
                              : "#f52900",
                        }}
                      >
                        {" "}
                        {target[0].probability >= 0 &&
                          target[0].probability <= 0.5 &&
                          " - Low"}
                        {target[0].probability > 0.5 &&
                          target[0].probability <= 0.7 &&
                          " - Medium"}
                        {target[0].probability > 0.7 && " - High"}
                      </Text>
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      marginRight: 20,
                      width: isExpanded ? 106 : 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        resetAll();
                      }}
                    >
                      <MaterialIcons name="cancel" size={55} color="#e75e00" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        setIsExpanded(false);
                        LayoutAnimation.configureNext({
                          duration: 400,
                          update: {
                            type: LayoutAnimation.Types.easeInEaseOut,
                          },
                        });
                      }}
                    >
                      <FontAwesome
                        name="check-circle"
                        size={55}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: "98%", flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={30}
                    color="green"
                    style={{ margin: 7 }}
                  />
                  <Text style={{ fontSize: 16, margin: 6, marginRight: 30 }}>
                    Recycling materials like paper, glass, and aluminum helps
                    conserve valuable natural resources
                  </Text>
                </View>

                <ScrollView
                  Style={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleRecycleButtonClick}
                    style={{
                      height: 55,
                      borderRadius: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      backgroundColor: "white",
                      borderColor: "green",
                      borderWidth: 2,
                      padding: 10,
                      margin: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "green", fontSize: 20 }}>
                        Recycle
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        <AntDesign name="arrowright" size={24} color="green" />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleReuseButtonClick}
                    style={{
                      height: 55,
                      borderRadius: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      backgroundColor: "white",
                      borderColor: "green",
                      borderWidth: 2,
                      padding: 10,
                      margin: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "green", fontSize: 20 }}>
                        Give away
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        <AntDesign name="arrowright" size={24} color="green" />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleRepairButtonClick}
                    style={{
                      height: 55,
                      borderRadius: 15,
                      marginLeft: 15,
                      marginRight: 15,
                      backgroundColor: "white",
                      borderColor: "green",
                      borderWidth: 2,
                      padding: 10,
                      margin: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "green", fontSize: 20 }}>
                        Repair
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        <AntDesign name="arrowright" size={24} color="green" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          )}

          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                width: 100,
                marginBottom: 40,
              }}
              onPress={checkapi}
            >
              <MaterialIcons
                name="add-to-photos"
                size={48}
                color="transparent"
              />
            </TouchableOpacity>
            {displayCameraButtom && (
              <>
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "white",
                    borderWidth: 5,
                    borderRadius: 50,
                    marginRight: 10,
                    marginBottom: 20,
                    height: 100,
                    width: 100,
                  }}
                  onPress={onCameraPress}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "black" }}
                  ></Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    color: "#444444",
                    width: 100,
                    marginBottom: 40,
                  }}
                  onPress={getPicFromGallery}
                >
                  <MaterialIcons
                    name="add-to-photos"
                    size={48}
                    color={COLORS.gray2}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </Camera>
      </View>
    );
  }
};

export default Scan;

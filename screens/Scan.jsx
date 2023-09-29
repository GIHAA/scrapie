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
import storage from "../components/auth/storage";
import { getStorage, ref , child , uploadBytes , getDownloadURL , uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';



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
  

  const navigation = useNavigation();

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

//   const deuploadImageToFirebase = async (imageUri, imageName) => {
//   try {
//     const firebaseConfig = {
//       apiKey: "AIzaSyAlNG-bgiezAnpcZyro90V3odkZ2XowXSU",
//       authDomain: "scrapie-85d87.firebaseapp.com",
//       projectId: "scrapie-85d87",
//       storageBucket: "scrapie-85d87.appspot.com",
//       messagingSenderId: "92530576790",
//       appId: "1:92530576790:web:53b0af7a2afd1583b721b7",
//       measurementId: "G-KPV0GF3HHE",
//     };


//     const app = initializeApp(firebaseConfig);
//     const storage = getStorage(app);

//     const { status } = await MediaLibrary.requestPermissionsAsync();

//     if (status === 'granted') {

//       const imageBlob = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const resizedImage = await ImageManipulator.manipulateAsync(
//         `data:image/jpeg;base64,${imageBlob}`,
//         [{ resize: { width: 500 } }], 
//         { format: 'jpeg', base64: true }
//       );

//       console.log('rrrrrrrrrrr')

//       const imageBlobObject = new Blob([resizedImage.base64], { type: 'image/jpeg' });
//       const imageFile = new File([imageBlobObject], imageName);

//       const storageRef = ref(storage, `images/${imageName}`);
//       await uploadBytes(storageRef, imageFile);

//       const downloadURL = await getDownloadURL(storageRef);

//       console.log('Download URL:', downloadURL);
//       return downloadURL;
//     } else {
//       console.error('Permission to read files not granted');
//     }
//   } catch (error) {
//     console.error('Error uploading local image to Firebase Storage:', error);
//     throw error;
//   }
// };


const uploadImageToFirebase = async (uri) => {

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
      // handle error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        const data = { item: target[0].className , image: downloadURL }
        //console.log(data)
        navigation.navigate("Reuse", { data });
      });
    }
  );

}
  
  

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

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "image.jpg",
        });

        setImage(result.assets[0].uri);

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
            const errorMessage = "No valid data found in response.";
            Alert.alert("Bad Request", errorMessage);
          }
        } else {
          const errorMessage = "No valid response data from API.";
          Alert.alert("Bad Request", errorMessage);
        }
      }
    } catch (error) {
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
          { compress: 0.7 }
        );
        setImage(resizedImage.uri);
        setRaw(photo.uri)

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

  const handleRepairButtonClick = () => {
    const data = { item: target[0].className };
    navigation.navigate("Repair", { data });
  };

  const handleReuseButtonClick = () => {
   uploadImageToFirebase(image)
 
    // const data = { item: target[0].className , image: downloadLink }
    // //console.log(data)
    // navigation.navigate("Reuse", { data });
  };

  const handleRecycleButtonClick = () => {
    const data = { item: target[0].className };
    navigation.navigate("Recycle", { data });
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
                style={{ height: isExpanded ? "57%" : "40%", width: "100%" }}
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
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      paddingLeft: 15,
                      paddingTop: 15,
                      paddingBottom: 15,
                      borderRadius: 40,
                      maxWidth: 300,
                    }}
                  >
                    {target[0].className}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      marginRight: 20,
                    }}
                  >
                    <TouchableOpacity
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
                      <MaterialIcons name="cancel" size={45} color="black" />
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
                        size={45}
                        color="black"
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
                    borderWidth: 5, // Adding border width
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

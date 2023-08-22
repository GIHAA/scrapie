import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';


const Scan = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

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


  const getPicFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1, // Adjust image quality as needed
      });
  
      if (!result.canceled) {
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
  
        // Make the API call with the selected image
        const response = await fetch("https://scrapie-5g3h.onrender.com/predict", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const responseData = await response.json();

        if (Array.isArray(responseData) && responseData.length > 0) {
          let message = "";
        
          responseData.forEach(item => {
            if (item.className && item.probability) {
              message += `Class: ${item.className}\nProbability: ${item.probability}\n\n`;
            } else {
              message += "Invalid data format in response.\n\n";
            }
          });
        
          if (message.length > 0) {
            Alert.alert("Prediction Results", message);
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
      console.error('Error selecting image and making API call:', error);
    }
  };
  
  const onCameraPress = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
  
        // Resize and compress the image
        const resizedImage = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 800 } }], // Adjust width as needed
          { compress: 0.7 } // Adjust compression quality
        );
  
        const formData = new FormData();
        formData.append("image", {
          uri: resizedImage.uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
  
        // Make the API call with the resized and compressed image
        const response = await fetch("https://scrapie-5g3h.onrender.com/predict", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const responseData = await response.json();
  
        if (Array.isArray(responseData) && responseData.length > 0) {
          let message = "";
        
          responseData.forEach(item => {
            if (item.className && item.probability) {
              message += `Class: ${item.className}\nProbability: ${item.probability}\n\n`;
            } else {
              message += "Invalid data format in response.\n\n";
            }
          });
        
          if (message.length > 0) {
            Alert.alert("Prediction Results", message);
          } else {
            const errorMessage = "No valid data found in response.";
            Alert.alert("Bad Request", errorMessage);
          }
        } else {
          const errorMessage = "No valid response data from API.";
          Alert.alert("Bad Request", errorMessage);
        }
        
        
      } catch (error) {
        console.error('Error taking picture and making API call:', error);
      }
    }
  };
  
  

  const checkapi = async () => {
    try {
      const response = await axios.get("https://scrapie-5g3h.onrender.com/hi");
      console.log("GET Response:", response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
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
                color: "#444444",
              }}
              onPress={checkapi}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                check
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: 50,
                marginRight: 10,
                marginBottom: 20,
                height: 100,
                width: 100,
              }}
              onPress={onCameraPress}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
                pic
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                color: "#444444",
              }}
              onPress={getPicFromGallery}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              gallery
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
};

export default Scan;
import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity } from "react-native";

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

  const toggleCameraType = () => {
    if (isCameraReady) {
      cameraRef.current.flipAsync();
    }
  };

  const onCameraPress = () => {};

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
              justifyContent: "center", // Center the content horizontally
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                color: "#444444",
              }}
              onPress={toggleCameraType}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 50,
                marginRight: 10,
                marginBottom: 20, // Adjusted margin for spacing
                height: 100,
                width: 100,
              }}
              onPress={onCameraPress}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
                pic
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
};

export default Scan;

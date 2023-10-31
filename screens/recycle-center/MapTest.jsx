import MapView, { Callout, Marker } from "react-native-maps";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import BottleImage from "../../assets/images/plastic_bottles.jpeg";

function MapTest() {
  const [currLati, setCurrLat] = useState(7.25184587048);
  const [currLongi, setCurrLongi] = useState(80.3456412507);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  function success(position) {
    setCurrLat(position.coords.latitude)
    setCurrLongi(position.coords.longitude)
    console.log(`Latitude: ${currLati}, Longitude: ${currLongi}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: currLati,
            longitude: currLongi,
            latitudeDelta: 1,
            longitudeDelta: 1,
        }}
      >
        {recycleRequests.length > 0 && recycleRequests.map((data, index) => (
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
                  <Text style={styles.name}>{data.recycleItem.description}</Text>
                  <Image 
                    style={styles.image}
                    source={require('../../assets/images/plastic_bottles.jpeg')}
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
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
      },
      // Arrow below the bubble
      arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
      },
      arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
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
  });

export default MapTest;

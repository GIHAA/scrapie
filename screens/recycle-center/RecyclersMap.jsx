import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import MapView, { Marker } from "react-native-maps";
import { RotateWithOffset } from "@tensorflow/tfjs";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const RecyclersMap = () => {
  const [longiDelta, setLongiDelta] = useState(0.421);
  const [latiDelta, setLatiDelta] = useState(0.922);
  const [zoom, setZoom] = useState(0.02);
  const [result, setResult] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 7.2518,
    longitude: 80.3456,
    latitudeDelta: 0.421,
    longitudeDelta: 0.922,
  });
  const [mapRegion, setmapRegion] = useState({
    latitude: 7.2518,
    longitude: 80.3456,
    latitudeDelta: 0.421,
    longitudeDelta: 0.922,
  });

  function generateNearbyCoordinates(lat, lon) {
    const radius = zoom;
    const nearbyCoordinates = [];
    for (let i = 0; i < 10; i++) {
      const newLat = lat + (Math.random() - 0.5) * radius * 2;
      const newLon = lon + (Math.random() - 0.5) * radius * 2;
      nearbyCoordinates.push({ latitude: newLat, longitude: newLon });
    }
    return nearbyCoordinates;
  }
  useEffect(() => {
    setResult(
      generateNearbyCoordinates(mapRegion.latitude, mapRegion.longitude)
    );
  }, []);

  useEffect(() => {
    console.log(zoom)
    let sortedLatitudes = [];
    let sortedLongitudes = [];
    result.map(({ latitude, longitude }) => {
      sortedLatitudes.push(latitude);
      sortedLongitudes.push(longitude);
    });
    sortedLatitudes = sortedLatitudes.sort();
    sortedLongitudes = sortedLongitudes.sort();
    setLatiDelta(
        (sortedLatitudes[sortedLatitudes.length - 1] - sortedLatitudes[0])*zoom
    );
    setLongiDelta(
        (sortedLatitudes[sortedLatitudes.length - 1] - sortedLatitudes[0])*zoom
    );
    setmapRegion({
      latitude: parseFloat(mapRegion.latitude),
      longitude: parseFloat(mapRegion.longitude),
      latitudeDelta: parseFloat((sortedLatitudes[sortedLatitudes.length - 1] - sortedLatitudes[0])*zoom),
      longitudeDelta: parseFloat((sortedLatitudes[sortedLatitudes.length - 1] - sortedLatitudes[0])*zoom),
    });
    console.log(mapRegion)
  }, [zoom]);

  const handleZoomIn = () => {
    setZoom(zoom / 10);
  };
  const handleZoomOut = () => {
    setZoom(zoom * 10);
  };
  const handleMyLocationPress = () => {
    setZoom(0.02)
    setmapRegion(initialRegion);
  };
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={handleZoomIn}
            style={{ paddingHorizontal: 20 }}
          >
            <Text style={{ fontSize: 34 }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleZoomOut}
            style={{ paddingHorizontal: 20 }}
          >
            <Text style={{ fontSize: 34 }}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMyLocationPress}
            style={{ paddingHorizontal: 20 }}
          >
            <Ionicons name="locate" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <MapView
          style={{ alignSelf: "stretch", height: "90%" }}
          region={mapRegion}
          ref={(MapView) => (this.MapView = MapView)}
          initialRegion={initialRegion}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={false}
          provider="google"
          onRegionChangeComplete={(region, details) => setmapRegion(region)}
        >
          <Marker
            coordinate={{
              latitude: 7.25184587048,
              longitude: 80.3456412507,
            }}
            title={`Pick up request`}
          ></Marker>
          {result.length > 0 ? (
            result.map(({ latitude, longitude }) => {
              return (
                <Marker
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                  key={latitude + "-" + longitude}
                ></Marker>
              );
            })
          ) : (
            <>
              <Marker
                coordinate={{
                  latitude: 7.26284587048,
                  longitude: 80.3566412507,
                }}
                title={`Pick up request`}
              ></Marker>
            </>
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default RecyclersMap;

const styles = StyleSheet.create({
  testStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    flexDirection: "column-reverse",
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { COLORS, SIZES } from "../../constants";

const MapGlimpse = () => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 7.25184587048,
    longitude: 80.3456412507,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: "stretch", height: "100%" }}
        region={mapRegion}
      >
        <Marker
          coordinate={{
            latitude: 7.25184587048,
            longitude: 80.3456412507,
          }}
          title={`Pick up request`}
        ></Marker>
        <Marker
          coordinate={{
            latitude: 7.4,
            longitude: 80.3456412507,
          }}
          title={`Pick up request`}
        ></Marker>
        <Marker
          coordinate={{
            latitude: 7.5184587048,
            longitude: 80.556412507,
          }}
          title={`Pick up request`}
        ></Marker>
        <Marker
          coordinate={{
            latitude: 7.74587048,
            longitude: 81.3456412507,
          }}
          title={`Pick up request`}
        ></Marker>
      </MapView>
    </View>
  );
};

export default MapGlimpse;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    height: "40%",
    margin: 30,
    marginTop: 10,
  },
});

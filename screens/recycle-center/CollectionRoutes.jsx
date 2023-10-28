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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";

function CollectionRoutes({navigation}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState([]);

  const upcomingList = [{
    id: 1,
    distance: 5.3,
    totalCollection: 4,
    noOfPickUps: 5,
    location: "Kegalle",
    scheduledDate: Date(),
  },
  {
    id: 2,
    distance: 7.2,
    totalCollection: 9,
    noOfPickUps: 4,
    location: "Uthuwankanda",
    scheduledDate: Date(),
  },]
  const completedList = [{
    id: 3,
    distance: 11.3,
    totalCollection: 10,
    noOfPickUps: 10,
    location: "Kegalle",
    scheduledDate: Date(),
  },
  {
    id: 4,
    distance: 9.1,
    totalCollection: 7,
    noOfPickUps: 13,
    location: "Warakapola",
    scheduledDate: Date(),
  },
  {
    id: 5,
    distance: 20.3,
    totalCollection: 2,
    noOfPickUps: 5,
    location: "Aranayake",
    scheduledDate: Date(),
  },]
  const [routes, setRoutes] = useState(upcomingList);

  const fetchRoutes = async () => {};
  useEffect(() => {
    if (isCompleted) {
      setRoutes(completedList)
    } else {
      setRoutes(upcomingList)
    }
  }, [isCompleted]);
  const [mapRegion, setmapRegion] = useState({
    latitude: 7.2518,
    longitude: 80.3456,
    latitudeDelta: 0.421,
    longitudeDelta: 0.922,
  });
  function generateNearbyCoordinates(lat, lon) {
    const radius = 0.1;
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

  const handleRoutePress = (routeId) => {
    navigation.navigate("MapTest", {
      coordinates: result,
      from: "RecyclersMap"
    })
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
            Pick-Up Schedules
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            if (Platform.OS === "android") {
              UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setIsCompleted(!isCompleted);
          }}
        >
          <View
            style={[
              styles.viewToggle,
              { flexDirection: "row" },
              !isCompleted
                ? { flexDirection: "row" }
                : { flexDirection: "row-reverse" },
            ]}
          >
            <View style={styles.circleToggle}>
              <Text style={styles.buttonText}>
                {!isCompleted ? "Upcoming" : "Completed"}
              </Text>
            </View>
            <View
              style={[styles.circleToggle, { backgroundColor: COLORS.primary }]}
            >
              <Text style={styles.buttonText}>
                {!isCompleted ? "Completed" : "Upcoming"}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={routes}
            keyExtractor={(route) => route.id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => handleRoutePress(item.id)}
                >
                  <View style={{justifyContent: 'flex-start', alignItems: 'stretch', flexDirection: 'row', marginBottom: 10 }}>
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color={COLORS.black}
                    />
                    <Text style={[styles.cardText, {marginLeft: 10}]}>
                      {item.location}
                    </Text>
                  </View>
                  <Text style={styles.cardText}>
                    No. of Pick-ups: {item.noOfPickUps}
                  </Text>
                  <Text style={styles.cardText}>
                    Date: {item.scheduledDate.split("2023")[0]}2023
                  </Text>
                  <View style={{
                    flexDirection: 'row', 
                    width: "100%", 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end'
                    }}>
                  <Text style={styles.cardText}>
                    Total Collection: {item.totalCollection} kg
                  </Text>
                  <Feather
                      name="arrow-right"
                      size={30}
                      color={COLORS.black}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
            numColumns={1}
          />
          {routes.map((route) => {
            {
              //console.log(route);
            }
          })}
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  selected: {
    backgroundColor: COLORS.lightWhite,
  },
  unselected: {
    backgroundColor: COLORS.green,
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
  viewToggle: {
    height: 50,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  circleToggle: {
    width: "50%",
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CollectionRoutes;

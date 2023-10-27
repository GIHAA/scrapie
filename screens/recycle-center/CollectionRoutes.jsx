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

function CollectionRoutes() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [routes, setRoutes] = useState([
    {
      id: 1,
      distance: 10,
      totalCollection: 0,
      noOfPickUps: 0,
      location: "Kegalle",
      scheduledDate: Date(),
    },
    {
      id: 2,
      distance: 10,
      totalCollection: 0,
      noOfPickUps: 0,
      location: "Kegalle",
      scheduledDate: Date(),
    },
    {
      id: 3,
      distance: 10,
      totalCollection: 0,
      noOfPickUps: 0,
      location: "Kegalle",
      scheduledDate: Date(),
    },
  ]);

  const fetchRoutes = async () => {};
  useEffect(() => {
    if (isCompleted) {
    } else {
    }
  }, [isCompleted]);
  const handleRoutePress = (routeId) => {
    alert("pressed " + routeId);
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

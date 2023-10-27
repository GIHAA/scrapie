import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../constants";
import "firebase/auth";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AppBar from "../../components/recycle/AppBar";
import { Dimensions } from "react-native";

const Recycle = ({ route }) => {
  const {
    recycleItem = { item: "Shoes", image: "https://picsum.photos/200/300" },
  } = route.params;

  console.log("Recycle Screen Data", recycleItem);

  const navigation = useNavigation();

  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const updateDescription = (value) => {
    setDescription(value);
  };

  const updateType = (value) => {
    setType(value);
  };

  const handleButtonPress = () => {
    recycleItem.type = type;
    recycleItem.description = description;
    navigation.navigate("RecycleCompanies", { recycleItem });
  };

  return (
    <View
      style={{
        flex: 1,
        minHeight: Math.round(Dimensions.get("window").height),
      }}
    >
      <AppBar title={"Item Details"}></AppBar>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, margin: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 38, fontWeight: "bold", color: COLORS.primary }}>
            Recycle {recycleItem.item}? 🍀
          </Text>

          <TextInput
            label="Type"
            mode="outlined"
            value={type}
            multiline
            activeOutlineColor={COLORS.primary}
            selectionColor={COLORS.primary}
            onChangeText={(text) => updateType(text)}
            style={styles.input}
          />

          <TextInput
            label="Description"
            mode="outlined"
            value={description}
            multiline
            activeOutlineColor={COLORS.primary}
            numberOfLines={8}
            onChangeText={(text) => updateDescription(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.container}>
          <Image
            source={require("../../assets/images/Recycling-sis.png")}
            style={styles.image}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              handleButtonPress();
            }}
            style={{
              margin: 20,
              backgroundColor: type && description ? COLORS.primary : "gray",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Find a Recycling Center{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Recycle;

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  button: {
    margin: 20,
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
    minHeight: 200,
  },
  image: {
    width: 200, 
    height: 200, 
  },
});

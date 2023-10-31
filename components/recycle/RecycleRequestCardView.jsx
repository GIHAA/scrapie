import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button } from 'react-native-paper';


const RecycleRequestCardView = ({ recycleRequest }) => {
  
  console.log("Recycle Request Card View", recycleRequest);
  
  const navigation = useNavigation();
  const viewRequest = () => {
    navigation.navigate("ViewRecycleRequest", { recycleRequest });
  };

  return (
  <TouchableOpacity style={[styles.card]}>
      <View style={styles.leftSide}>
        <Image source={{ uri: recycleRequest.recycleCompany.image }} style={styles.image} />
      </View>
      <View style={styles.rightSide}>
        {recycleRequest.recycleCompany?.popular && (
          <TouchableOpacity
            style={{
              height: 20,
              width: 55,
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 45,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled
          >
            <Text style={{ color: COLORS.white, fontSize: 12 }}>Popular</Text>
          </TouchableOpacity>
        )}
        <View style={{marginBottom:20, marginLeft:5}}>
        <Text style={styles.name}>{recycleRequest.recycleItem.item}</Text>
        <Text style={styles.description}>{recycleRequest.recycleCompany.description}</Text>
        <Text style={styles.details}>{recycleRequest.recycleCompany?.contact}</Text>
        </View>
        <Button
        onPress={viewRequest}
          buttonColor="green"
          labelStyle={{ color: "white" }}
          style={{ marginBottom: 25 }}
        >
          Select
        </Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "90%",
    height: 200,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  leftSide: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  rightSide: {
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    marginTop: -40,
  },
  image: {
    marginLeft: 10,
    width: 120,
    height: 150,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  description: {
    fontSize: 13,
    color: "gray",
    marginTop: 5,
  },
});

export default RecycleRequestCardView;
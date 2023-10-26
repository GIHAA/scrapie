
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const RecycleCompanyCardView = ({ recycleCompany, recycleItem }) => {
  
  console.log("Recycle Company Card View Recycle Company", recycleCompany);
  console.log("Recycle Company Card View Recycle Item", recycleItem);

  const navigation = useNavigation();

  const viewCompany = () => {
    navigation.navigate("ViewRecycleCompany", { recycleCompany, recycleItem });
  };

  return (
    <TouchableOpacity style={[styles.card]}>
      <View style={styles.leftSide}>
        <Image source={{ uri: recycleCompany.image }} style={styles.image} />
      </View>
      <View style={styles.rightSide}>
        {recycleCompany?.popular && (
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
        <Text style={styles.name}>{recycleCompany.name}</Text>
        <Text style={styles.description}>{recycleCompany.description}</Text>
        <Text style={styles.details}>{recycleCompany?.contact}</Text>
        </View>
        <Button
          onPress={viewCompany}
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
    marginTop: 20,
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

export default RecycleCompanyCardView;

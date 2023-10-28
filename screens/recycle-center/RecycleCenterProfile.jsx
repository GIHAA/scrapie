import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const ProfilePage = ({navigation}) => {
  const handleLogoutPress = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.companyName}>Ajith Recycles</Text>
      </View>

      <View style={styles.infoContainer}>
        <Image
          source={require("../../assets/images/recycle-company.jpeg")}
          style={styles.companyPhoto}
        />
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Basic Info</Text>
          <Text style={styles.infoTextName}>Since</Text>
          <Text style={styles.infoText}>2018</Text>
          <Text style={styles.infoTextName}>Address:</Text>
          <Text style={styles.infoText}>48, New Kandy Road, Malabe.</Text>
          <Text style={styles.infoTextName}>Email:</Text>
          <Text style={styles.infoText}>mail@ajithrecycles.com</Text>
          <Text style={styles.infoTextName}>Phone Number:</Text>
          <Text style={styles.infoText}>083-412-0411</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Business Info</Text>
          <Text style={styles.infoTextName}>Recycling materials:</Text>
          <Text style={styles.infoText}>Plastic, Polythene</Text>
          <Text style={styles.infoTextName}>License:</Text>
          <Text style={styles.infoText}>
            Environmental Protection License from Central Environment Authority
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Drop Off</Text>
          <Text style={styles.infoTextName}>Accepts drop-off:</Text>
          <Text style={styles.infoText}>Yes</Text>
          <Text style={styles.infoTextName}>Drop-off Location:</Text>
          <Text style={styles.infoText}>48, New Kandy Road, Malabe</Text>
          <Text style={styles.infoTextName}>Drop-off available time:</Text>
          <Text style={styles.infoText}>06:00AM - 06:00PM</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: COLORS.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogoutPress}
          style={[
            styles.button,
            {
              backgroundColor: COLORS.red,
            },
          ]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  companyName: {
    fontSize: 35,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row-reverse",
    marginTop: 20,
  },
  companyPhoto: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  infoBox: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.gray,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  infoTextName: {
    fontSize: 16,
    color: COLORS.gray,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
  },
});

export default ProfilePage;

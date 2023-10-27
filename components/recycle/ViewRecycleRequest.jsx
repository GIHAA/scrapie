import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, View } from 'react-native';
import { db } from "../../firebase.config";

const ViewRecycleRequest = ({ route }) => {
  const { data } = route.params;
  console.log("data", data);
  const [request, setRequest] = useState(data);
  console.log("request", request);
  const updateUser = () => {
    const updateDBRef = db.collection("users").doc(request.id);
    updateDBRef
      .set({
        name: request.name,
        email: request.email,
        mobile: request.mobile,
      })
      .then(() => {
        // Handle success
        console.log("User updated successfully");
        // You can choose to do something here, such as navigating back
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const deleteUser = () => {
    const dbRef = db.collection("recycleItems").doc(request.id);
    dbRef.delete().then(() => {
      console.log("User removed from the database");
      // You can choose to do something here, such as navigating back
    });
  };

  const openTwoButtonAlert = () => {
    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        { text: "Yes", onPress: deleteUser },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Name"}
          value={request.item}
          onChangeText={(val) => setRequest({ ...request, name: val })}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"Email"}
          value={request.description}
          onChangeText={(val) => setRequest({ ...request, email: val })}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Mobile"}
          value={request.type}
          onChangeText={(val) => setRequest({ ...request, mobile: val })}
        />
      </View>
      <View style={styles.button}>
        <Button title="Update" onPress={updateUser} color="#19AC52" />
      </View>
      <View>
        <Button title="Delete" onPress={openTwoButtonAlert} color="#E37399" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  button: {
    marginBottom: 7,
  },
});

export default ViewRecycleRequest;

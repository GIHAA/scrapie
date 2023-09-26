import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Reuse = ({ route }) => {
  const { data } = route.params;
  return (
    <View>
      <Text style={{ marginTop: 100, fontSize: 20 }}>Give away {data.item}</Text>
    </View>
  );
};

export default Reuse;

const styles = StyleSheet.create({});

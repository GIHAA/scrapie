import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button } from 'react-native-paper';


const RecycleRequestCardView = ({ recycleRequest }) => {
  const { item, seller, price, image, description, phone } = recycleRequest;
  const navigation = useNavigation();

  const viewRequest = () => {
    const data = { image, seller, description, item, price, phone };

    navigation.navigate("ViewRecycleRequest", { data });
  };
  return (
   
    <Card style={styles.card}>
      <Card.Cover source={{ uri: recycleRequest.imageUrl }} />
      <Card.Content>
        <Title>{recycleRequest.title}</Title>
        <Text>{recycleRequest.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button buttonColor="green" labelStyle={{ color: 'white' }}>View</Button>
      </Card.Actions>
    </Card>
  );
};

export default RecycleRequestCardView;

const styles = {
  card: {
    margin: 5, // Add margin for spacing between cards
  },
};
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button } from 'react-native-paper';


const RecycleCompanyCardView = ({ recycleCompany, recycleItem}) => {

  console.log("Recycle Company Card View Recycle Company", recycleCompany)
  console.log("Recycle Company Card View Recycle Item", recycleItem)

  const navigation = useNavigation();

  const viewCompany = () => {
    navigation.navigate("ViewRecycleCompany", { recycleCompany, recycleItem });
  };

  return (
   
    <Card style={styles.card}>
      <Card.Cover source={{ uri: recycleCompany.image }} />
      <Card.Content>
        <Title>{recycleCompany.name}</Title>
        <Text>{recycleCompany.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button 
        onPress={viewCompany}
        buttonColor="green" 
        labelStyle={{ color: 'white' }}>
        Select
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default RecycleCompanyCardView;

const styles = {
  card: {
    margin: 5,
  },
};
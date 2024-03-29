import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Slider,
} from 'react-native'
import { useState } from 'react';
import React from 'react'
import formatTitle from '../util/FormatTitle';
import ImageWithText from '../components/repair/ImageWithText';
import Button from '../components/repair/Button';
import { useNavigation } from "@react-navigation/native";
import SelectRepairCenter from './SelectRepairCenter';

const Repair = ({ route }) => {
  const [days, setDays] = useState();
  const [sliderValue, setSliderValue] = useState(0);

  const navigation = useNavigation();

  const { data } = route.params;
  const {item, image } = data;

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleButtonPress = () => {
    const data = {item: item, image: image, days: days, sliderValue: sliderValue};
    navigation.navigate("SelectRepairCenter",  { data });
  };

  return (
    <View>
      <Text style={styles.header}>Your Expectations</Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <ImageWithText 
          imageUri={image}
          title={formatTitle(item)}
          text=""
        />
      </View>
      <View>
        <SafeAreaView>
          <View style={styles.container}>
            <View>
              <Text style={styles.resultText}>Expecting Result In</Text>
              <TextInput
                style={styles.input}
                onChangeText={setDays}
                placeholder='Number of Days'
                caretHidden
              />
            </View>
            <View>
              <Text style={styles.budgetText}>Budget</Text>
              <Slider
                style={styles.slider}
                minimumValue={300}
                maximumValue={2000}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="#0000FF"
                value={sliderValue}
                step={100}
                onValueChange={handleSliderChange}
              />
              <Text style={{ 
                fontSize: 16,
                marginLeft: 35,
                marginTop: -10,
              }}>LKR: {sliderValue}</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View style={{
        marginTop: 80
      }}>
        <Button text="Proceed" onPress={handleButtonPress}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
    fontSize: 40,
    marginLeft: 20,
  },
  container: {
    marginTop: 80,
  },
  input: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "gray"
  },
  resultText: {
    marginLeft: 20,
    fontSize: 20,
    paddingBottom: 10
  },
  budgetText: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
    paddingBottom: 10
  },
  slider: {
    width: "90%",
    height: 40,
    marginLeft: 20,
  }
})

export default Repair;

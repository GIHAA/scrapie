import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Repair = ({ route }) => {
  const { data } = route.params;
  return (
    <View>
      <Text style={{ marginTop: 100, fontSize: 20 }}>Repair {data.item}</Text>
    </View>
  )
}

export default Repair

const styles = StyleSheet.create({})
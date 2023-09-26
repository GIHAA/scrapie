import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Recycle = ({ route }) => {
  const { data } = route.params;
  return (
    <View>
      <Text style={{ marginTop: 100, fontSize: 20 }}>Recycle {data.item}</Text>
    </View>
  )
}

export default Recycle

const styles = StyleSheet.create({})
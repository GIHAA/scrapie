import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/images/logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 124,
    height: 116,
    marginBottom: 10,
    marginTop: 30
  },
})

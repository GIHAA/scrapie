import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
import styles from './headling.style'

const Headlng = () => {
  return (
    <View style={styles.continer}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}> New arrivals</Text>
                <TouchableOpacity>
                    <Ionicons name="ios-grid" size={24} color={COLORS.primary} />
                </TouchableOpacity> 
    
        </View>
    </View>
  )
}

export default Headlng

import { TextInput , TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from '../constants';
import { StyleSheet } from "react-native";

const Search = () => {
  return (
    <SafeAreaView>

<View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons name="camera-outline"  size={SIZES.xLarge} style={styles.searchIcon} />
          </TouchableOpacity>
  
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=""
              onPressIn={() => {}}
              placeholder="what are you looking for"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.searchBtn}>
              <Feather name="search" size={24} color={COLORS.offwhite}  />
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  searchContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      marginHorizontal: SIZES.small,
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.medium,
      marginVertical: SIZES.medium,
      height: 50
  },
  searchIcon: {
      marginHorizontal: 10,
      color: COLORS.gray,
      marginTop: SIZES.small
  },
  searchWrapper: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      marginRight: SIZES.small,
      borderRadius: SIZES.small,

  },
  searchInput: {
      fontFamily: "regular",
      width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.small
  },
  searchBtn: {
      width: 50,
      height: "100%",
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.primary
  }
})
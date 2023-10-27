import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: 171,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.black,
    marginBottom : 8,
   borderColor : COLORS.primary,
   borderWidth : 1,
   boxShadow: '0 7px 5px rgba(0, 0, 0, 0.2)',
  },
  imageContainer : {
    flex: 1,
    width: 157,
    marginLeft: SIZES.small/2,
    marginTop: SIZES.small/2,
    borderRadius: SIZES.small,
    overflow: "hidden"
  },
  image : {
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  details : {
    padding: SIZES.small
  },
  supplier : {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray
  },
  price : {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtn : {
    position: "absolute"
    
  }
});

export default styles;

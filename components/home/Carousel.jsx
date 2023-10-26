import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, SIZES } from '../../constants';

const Carousel = () => {
  
    const slides = [
        "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/Group%20289323.jpg?alt=media&token=31116a4c-0897-47e8-afe3-3f80b21684fe",
        "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/Group%20289328.jpg?alt=media&token=7a8edd1b-cb10-4a03-8d2b-989044302955",
        "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/PCT-031%201.jpg?alt=media&token=a31aab7b-ba90-48a2-b2f8-429fbe0410a8"
       ];
      
    return (
    <View style={styles.carouselContainer}>
        <SliderBox images={slides}
        dotColor= {COLORS.primary}
        inactiveDotColor = {COLORS.secondary}
        ImageComponentStyle = {{ borderRadius: 15, width: "93%" , marginTop: 15}}
        autoplay
        circleLoop
        />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: SIZES.xLarge
    }
})
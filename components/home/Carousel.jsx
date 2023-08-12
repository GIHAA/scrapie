import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, SIZES } from '../../constants';

const Carousel = () => {
  
    const slides = [
        "https://i.ibb.co/SNH7hLW/imagesasd.jpg",
        "https://i.ibb.co/X5pSPdL/images.jpg",
        "https://t3.ftcdn.net/jpg/03/29/63/10/240_F_329631000_Km32vmHK7u8jyCGiSq70aTIkNRSnVEwf.jpg"
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
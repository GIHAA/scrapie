import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, SIZES } from '../../constants';

const SchedulesCarousel = () => {

    const slides = [
        "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/Group%20289323.jpg?alt=media&token=31116a4c-0897-47e8-afe3-3f80b21684fe",
        "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/PCT-031%201.jpg?alt=media&token=a31aab7b-ba90-48a2-b2f8-429fbe0410a8",
        "https://www.bezner.com/wp-content/uploads/2017/07/PET-Recycling-Plant-2.jpg"
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

export default SchedulesCarousel

const styles = StyleSheet.create({
    carouselContainer: {
        alignItems: "center",
        height: 500,
    }
})
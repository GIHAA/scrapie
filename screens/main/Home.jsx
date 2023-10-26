import { View , StyleSheet} from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import {Heading, MapGlimpse, SchedulesCarousel, Welcome} from "../../components";
import { COLORS , SIZES } from "../../constants";

const Home = () => {
    const [currentLocation, setCurrentLocation] = useState("");
    const getCurrentLocation = async () => {

    }

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>

                </View>
            </View>

            <ScrollView>
                <Welcome />
                <MapGlimpse />
                <Heading />
                <SchedulesCarousel />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    testStyle: {
        fontFamily: "bold",
        fontSize: 40
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: SIZES.small
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color : COLORS.gray
    },
    cartCount: {
        position:"absolute",
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 999
    },
    cartNumber: {
        fontFamily: "regular",
        fontWeight: "600",
        fontSize: 10,
        color: COLORS.lightWhite
    }
})
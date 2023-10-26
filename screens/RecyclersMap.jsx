import { View , StyleSheet} from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {MapGlimpse} from "../components";
import { COLORS , SIZES } from "../constants";

const RecyclersMap = () => {
    const [currentLocation, setCurrentLocation] = useState("");
    const getCurrentLocation = async () => {

    }

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <MapGlimpse/>
            </View>
        </SafeAreaView>
    );
};

export default RecyclersMap;

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
})
import { View, Text } from "react-native";
import React, { useState } from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeText(COLORS.black, SIZES.xSmall)}>
                    Good Day!
                </Text>
            </View>
        </View>
    );
};

export default Welcome;

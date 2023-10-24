import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/repair/Button";
import ModalPopUp from "../components/repair/ModalPopup";
import { COLORS } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import ImageWithText from "../components/repair/ImageWithText";

const ConfirmRequestRepairCenter = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();

    const handleButtonPress = () => {
        // Simulate success/failure
        const isSuccess = true;
        setSuccess(isSuccess);
        setModalVisible(true);
    }

    const imageData = {
        imageUri: "your_image_url_here",
        title: "Image Title",
        text: "Description or Text",
    };

    const handleGoBackHomeButtonPress = () => {
        setModalVisible(false);
        navigation.navigate(Home);
    }

    return (
        <View>
            <Text style={styles.header}>Confirm Request</Text>
            <View
                style={{
                    marginTop: 20
                }}
            >
                <ImageWithText {...imageData} />
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.resultText}>Expecting Result In</Text>
                    <Text style={styles.resultText}>2 Days</Text>
                </View>
                <View>
                    <Text style={styles.resultText}>Budget</Text>
                    <Text style={styles.resultText}>LKR: 10000</Text>
                </View>
                <View>
                    <Text style={styles.resultText}>Repair Center</Text>
                    <Text style={styles.resultText}>Adam Repair Centers, Colombo 10.</Text>
                </View>
            </View>

            <View style={{ marginTop: 780, position: "absolute", width: '100%', }}><Button text="Confirm" onPress={handleButtonPress} /></View>
            <View style={styles.container}>
                <ModalPopUp visible={isModalVisible}>
                    <View>
                        {success ? (
                            <View>
                                <Icon name="check" style={styles.icon} size={120} color={COLORS.primary} />
                                <Text style={styles.successPopUpTitle}>Success</Text>
                                <Text style={styles.successPopUpBody}>Your request has been recorded!</Text>
                            </View>
                        ) : (
                            <View>
                                <Icon name="times" style={styles.icon} size={120} color={COLORS.red} />
                                <Text style={styles.failedPopUpTitle}>Failed</Text>
                                <Text style={styles.failedPopUpBody}>Your request has not been recorded!</Text>
                            </View>
                        )}
                        <Button
                            text="Go back to the home"
                            onPress={handleGoBackHomeButtonPress}
                            status={success ? "success" : "fail"}
                        />
                    </View>
                </ModalPopUp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
    container: {
        marginTop: 80,
    },
    resultText: {
        marginLeft: 20,
        fontSize: 20,
        paddingBottom: 10
    },
    successPopUpTitle: {
        color: COLORS.primary,
        textAlign: "center",
        fontSize: 30
    },
    successPopUpBody: {
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 40,
        fontSize: 18
    },
    failedPopUpTitle: {
        color: COLORS.red,
        textAlign: "center",
        fontSize: 30
    },
    failedPopUpBody: {
        color: COLORS.red,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 40,
        fontSize: 18
    },
    icon: {
        textAlign: "center",
    },
    buttonSuccess: {
        backgroundColor: COLORS.primary,
    },
    buttonFail: {
        backgroundColor: COLORS.red,
    },
})

export default ConfirmRequestRepairCenter;

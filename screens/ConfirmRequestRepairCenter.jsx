import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/repair/Button";
import ModalPopUp from "../components/repair/ModalPopup";
import { COLORS } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import ImageWithText from "../components/repair/ImageWithText";
import getRepairCenterById from "../service/repair/getRepairCenterById";
import getUserData from "../service/repair/getUser";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

const ConfirmRequestRepairCenter = ({ route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [repairCenter, setRepairCenter] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);

    const navigation = useNavigation();
    const { data } = route.params;
    const { item, image, days, sliderValue, repairCenterId } = data;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRepairCenterById(repairCenterId);
            getUserData(setLoggedUser);
            if (data) {
                setRepairCenter(data);
            }
        }
        fetchData();
    }, []);

    const requestCollection = collection(db, "repair-center-request");

    const handleButtonPress = async () => {
        // create a repair center request
        const data = {
            item: item,
            image: image,
            days: days,
            budget: sliderValue,
            repairCenterId: repairCenterId,
            userId: loggedUser.id,
            dateTime: new Date().toISOString(),
            status: "pending",
            deliveryAt: null,
        }

        await addDoc(requestCollection, data)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                const isSuccess = true;
                setSuccess(isSuccess);
                setModalVisible(true);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                const isSuccess = false;
                setSuccess(isSuccess);
                setModalVisible(true);
            });
    }

    const imageData = {
        imageUri: image,
        title: item,
        text: "",
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
                    <Text style={styles.resultText}>{days} Days</Text>
                </View>
                <View>
                    <Text style={styles.resultText}>Budget</Text>
                    <Text style={styles.resultText}>LKR: {sliderValue}</Text>
                </View>
                <View>
                    <Text style={styles.resultText}>Repair Center</Text>
                    <Text style={styles.resultText}>{repairCenter ? repairCenter.name : "N/A"}</Text>
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

import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import ModalPopUpRepair from './ModalPopupRepair';
import { setDoc, doc, increment } from "@firebase/firestore";
import { db } from '../../firebase.config';

const RepairCenterCard = ({ id, imageSource, name, address, phoneNumber, opens, description, popular, count, isSelected, onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = async (id, count) => {
        let isPopular = false;
        if (count > 100) {
            isPopular = true;
        }
        const docRef = doc(db, 'repair-centers', id);
        try {
            await setDoc(docRef, { visits: increment(1), isPopular: isPopular }, { merge: true });
            console.log("Request updated successfully");
        } catch (error) {
            console.error("Error updating request:", error);
        }
        setModalVisible(true);
    }

    const modalContent = (
        <View style={styles.modalContentContainer}>
            <Image source={{ uri: imageSource }} style={styles.modalImage} />
            <Text style={styles.modalName}>{name}</Text>
            <Text style={styles.modalDetails}>Contacts: {phoneNumber}</Text>
            {/* <Text style={styles.modalDetails}>Location: {address}</Text> */}
            <Text style={styles.modalDetails}>Opens: {opens}</Text>
            <Text style={styles.modalDescription}>Description: {description}</Text>
        </View>
    );

    return (
        <View
            style={[
                styles.card,
                isSelected ? { borderColor: COLORS.red, borderLeftWidth: 5, borderBottomWidth: 5 } : { borderColor: COLORS.primary }
            ]}
        >
            <View style={styles.leftSide}>
                <Image source={{ uri: imageSource }} style={styles.image} />
            </View>
            <View style={styles.rightSide}>
                {(popular) && (
                    <TouchableOpacity
                        style={{
                            height: 20,
                            width: 55,
                            backgroundColor: COLORS.primary,
                            borderRadius: 50,
                            marginTop: 45,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disabled
                    >
                        <Text style={{ color: COLORS.white, fontSize: 12 }}>Popular</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>Contacts: {phoneNumber}</Text>
                <Text style={styles.details}>Location: {address}</Text>
                <Text style={styles.details}>Opens: {opens}</Text>
                <Text style={styles.description}>Description: {description}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => toggleModal(id, count)}
                        style={[styles.button, { backgroundColor: COLORS.primary }]}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPress}
                        style={[styles.button, { backgroundColor: COLORS.primary }]}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ModalPopUpRepair visible={modalVisible} onClose={() => setModalVisible(false)}>{modalContent}</ModalPopUpRepair>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 230,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'E3E5E5',
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 20
    },
    leftSide: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    rightSide: {
        flex: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: -40,
    },
    image: {
        marginLeft: 10,
        width: 120,
        height: 150,
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: 'gray',
    },
    description: {
        fontSize: 13,
        color: 'gray',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flex: 1,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    modalContentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: 120,
        height: 150,
        borderRadius: 5,
    },
    modalName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalDetails: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 5,
    },
    modalDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 10,
    },
    modalButton: {
        marginTop: 20,
        width: 150,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RepairCenterCard;

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { COLORS } from '../constants';

const PendingRequestCard = ({ imageSource, name, address, phoneNumber, budget, requestedAt }) => {
    return (
        <View style={styles.card}>
            <View style={styles.leftSide}>
                <Image source={{ uri: imageSource }} style={styles.image} />
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>Location: {address}</Text>
                <Text style={styles.details}>Budget: {budget}</Text>
                <Text style={styles.details}>Requested At: {requestedAt}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.primary }]}
                        onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.red }]}
                        onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: COLORS.primary,
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
        marginTop: -20,
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
});

export default PendingRequestCard;

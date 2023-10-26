import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const RepairCenterCard = ({ imageSource, name, address, phoneNumber, opens, description, popular, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isSelected ? { borderColor: COLORS.red, borderLeftWidth: 5, borderBottomWidth: 5 } : { borderColor: COLORS.primary }
            ]}
            onPress={onPress}
        >
                <View style={styles.leftSide}>
                    <Image source={{ uri: imageSource }} style={styles.image} />
                </View>
                <View style={styles.rightSide}>
                    {popular && (
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
            </View></TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 200,
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
});

export default RepairCenterCard;

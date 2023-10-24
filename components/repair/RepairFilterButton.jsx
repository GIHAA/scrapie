import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants';

const RepairFilterButton = ({ text, onPress, clicked }) => {
    let buttonColor;
    let borderColor;
    let textColor;

    if (clicked === true) {
        buttonColor = COLORS.primary;
        borderColor = COLORS.primary;
        textColor = COLORS.white;
    } else if (clicked === false) {
        buttonColor = COLORS.white;
        borderColor = COLORS.gray;
        textColor = COLORS.black;
    }

    return (
        <TouchableOpacity
            style={{
                height: 40,
                width: 110,
                backgroundColor: buttonColor,
                borderColor: borderColor,
                borderRadius: 50,
                marginLeft: 10,
                marginRight: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={onPress}
        >
            <Text style={{ 
                color: textColor, 
                fontSize: 13,
            }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default RepairFilterButton;

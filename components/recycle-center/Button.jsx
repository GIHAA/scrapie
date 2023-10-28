import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants';
const Button = ({ text, onPress, status }) => {

    let buttonColor = COLORS.primary;

    if (status === 'success') {
        buttonColor = COLORS.primary;
    } else if (status === 'fail') {
        buttonColor = COLORS.red;
    }

    return (
        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: buttonColor,
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
            <Text style={{ color: COLORS.white, marginRight: 10 }}>{text}</Text>
            <Icon name="chevron-right" size={20} color={COLORS.white} />
        </TouchableOpacity>
    );
};

export default Button;

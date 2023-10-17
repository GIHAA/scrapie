import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants';

const Button = ({ text, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.primary,
                borderRadius: 20,
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

import { Text, View } from 'react-native';
import React from 'react';
import styles from '../product/productCardView.style';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>Product Name</Text>
        </View>
    )
}

export default Header;
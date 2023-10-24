import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./imageWithText.style";

const ImageWithText = ({ imageUri, title, text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default ImageWithText;

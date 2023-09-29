import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import styles from './productCardView.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const ProductCardView = ({ product }) => {
  const { item, seller, price, image } = product;

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {seller}
          </Text>
          <Text style={styles.price}>${price}</Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

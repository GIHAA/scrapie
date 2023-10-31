import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import AppBar from '../../components/recycle/AppBar';

const ViewRecycleRequest = ({ route }) => {
 
const { recycleRequest } = route.params;
console.log("View Recycle Request", recycleRequest);

  return (
    <ScrollView style={styles.container}>
    <AppBar title="Recycle Request" />

    <Text style={styles.header}> Recycle Item Details</Text>
    <View style={styles.card}>
      <Image style={styles.itemImage} source={{ uri: recycleRequest?.recycleItem.image }} />

      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{recycleRequest?.recycleItem?.item} | {recycleRequest?.recycleItem?.type.toUpperCase()} </Text>
        <Text style={styles.itemDescription}>{recycleRequest?.recycleItem?.description}</Text>

        <View style={styles.separator} />

        <Text style={styles.header}> Recycling Center Details</Text>

        <Image style={styles.companyImage} source={{ uri: recycleRequest?.recycleCompany.image }} />
        
        <Text style={styles.itemName}>{(recycleRequest?.recycleCompany.name || 'N/A')}</Text>

        {/* <Text style={styles.companyDescription}>{recycleRequest?.recycleCompany.description}</Text> */}
        <Text style={styles.companyDescription}> {recycleRequest?.recycleRequest?.type} | {(recycleRequest?.recycleRequest?.date || "Malabe")} </Text>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    marginVertical: 8,
    borderRadius: 10,
    padding: 20,
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
  itemName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  itemType: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 8,
  },
  companyDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 16,
  },
  companyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  confirmButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop: 16,
    borderRadius: 10,
    marginBottom: 40,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.primary,
    marginVertical: 10, 
  },
});

export default ViewRecycleRequest;

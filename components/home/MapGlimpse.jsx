import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS, SIZES} from '../../constants';

const MapGlimpse = () => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View style={styles.container}>
            <MapView
                style={{alignSelf: 'stretch', height: '100%'}}
                region={mapRegion}
            />
        </View>
    );
};

export default MapGlimpse;

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: SIZES.xLarge
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
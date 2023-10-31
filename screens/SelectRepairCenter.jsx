import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfirmRequestRepairCenter from "./ConfirmRequestRepairCenter";
import Button from "../components/repair/Button";
import { COLORS } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import RepairFilterButton from "../components/repair/RepairFilterButton";
import { useState } from "react";
import RepairCenterPopular from "../components/repair/RepairCenterPopular";
import RepairCenterNearBy from "../components/repair/RepairCenterNearBy";
import RepairCenterTop from "../components/repair/RepairCenterTop";
import { data } from "@tensorflow/tfjs";

const SelectRepairCenter = ({ route }) => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState("popular");
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const { data } = route.params;
    const { item, image, days, sliderValue } = data;

    const handleFilterChipsButton = (buttonName) => {
        setActiveButton(buttonName);
    }

    const handleButtonPress = () => {
        const data = { item: item, image: image, days: days, sliderValue: sliderValue, repairCenterId: selectedCardIndex };
        navigation.navigate("ConfirmRequestRepairCenter", { data });
    }

    let renderedComponent;
    if (activeButton === 'popular') {
        renderedComponent = <RepairCenterPopular setSelectedCardIndex={setSelectedCardIndex} />;
    } else if (activeButton === 'nearby') {
        renderedComponent = <RepairCenterNearBy setSelectedCardIndex={setSelectedCardIndex} />;
    } else if (activeButton === 'top') {
        renderedComponent = <RepairCenterTop setSelectedCardIndex={setSelectedCardIndex} />;
    }

    return (
        <View>
            {/* heading */}
            <Text style={styles.header}>Repair Centers</Text>

            {/* search box */}
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Search" placeholderTextColor={COLORS.black} />
                <TouchableOpacity style={styles.searchButton}>
                    <Icon name="search" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* filtration chips */}
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                <RepairFilterButton text="Popular" onPress={() => handleFilterChipsButton("popular")} clicked={activeButton === "popular"} />
                <RepairFilterButton text="Nearby" onPress={() => handleFilterChipsButton("nearby")} clicked={activeButton === "nearby"} />
                <RepairFilterButton text="Top" onPress={() => handleFilterChipsButton("top")} clicked={activeButton === "top"} />
            </View>

            {/* Render the selected Repair Center component */}
            {renderedComponent}

            {/* proceed button */}
            <View style={{ marginTop: 780, position: "absolute", width: '100%', }}>
                <Button text="Send the Request" onPress={handleButtonPress} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
    container: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginLeft: 20,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        color: COLORS.black,
    },
    searchButton: {
        padding: 10,
    },
})

export default SelectRepairCenter;

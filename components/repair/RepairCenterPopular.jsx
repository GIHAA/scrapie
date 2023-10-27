import { View, ScrollView, StyleSheet } from "react-native";
import RepairCenterCard from "./RepairCenterCard";
import { useState, useEffect } from "react";
import fetchRepairCenters from "../../service/repair/fetchRepairCenters";

const RepairCenterPopular = ({ setSelectedCardIndex }) => {
    const [cardIndex, setCardIndex] = useState(null);
    const [repairCenterData, setRepairCenterData] = useState([]);

    useEffect(() => {
        fetchRepairCenters({setRepairCenterData});
    }, []);

    const handleCardPress = (id) => {
        setSelectedCardIndex(id);
        setCardIndex(id);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ marginTop: 30 }}>
                {repairCenterData.map((center, index) => (
                    <RepairCenterCard
                        key={index}
                        imageSource={center.image}
                        name={center.name}
                        // address={center.address}
                        phoneNumber={center.contact}
                        opens={`${center.openFrom}- ${center.openTo}`}
                        description={center.description}
                        popular={center.isPopular}
                        isSelected={cardIndex === center.id}
                        onPress={() => handleCardPress(center.id)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
    }
});

export default RepairCenterPopular;

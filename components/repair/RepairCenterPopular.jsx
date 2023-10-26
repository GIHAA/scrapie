import { View, ScrollView, StyleSheet } from "react-native";
import RepairCenterCard from "./RepairCenterCard";
import { useState } from "react";

const repairCenterData = [
    {
        id: 1,
        imageSource: 'https://metro.co.uk/wp-content/uploads/2023/04/SEI_128990932-7165.jpg?quality=90&strip=all',
        name: 'Repair Center Name 1',
        address: '123 Repair Street, City 1',
        phoneNumber: '123-456-7890',
        opens: '8 AM to 8 PM',
        description: 'We will repair all the electronics in your home',
        popular: true,
    },
    {
        id: 3,
        imageSource: 'https://metro.co.uk/wp-content/uploads/2023/04/SEI_128990932-7165.jpg?quality=90&strip=all',
        name: 'Repair Center Name 2',
        address: '456 Repair Street, City 2',
        phoneNumber: '987-654-3210',
        opens: '9 AM to 9 PM',
        description: 'Your trusted source for electronic repairs.',
        popular: true,
    },
    {
        id: 5,
        imageSource: 'https://metro.co.uk/wp-content/uploads/2023/04/SEI_128990932-7165.jpg?quality=90&strip=all',
        name: 'Repair Center Name 3',
        address: '789 Repair Street, City 3',
        phoneNumber: '555-555-5555',
        opens: '10 AM to 6 PM',
        description: 'We fix electronics quickly and efficiently.',
        popular: false,
    },
    {
        id: 7,
        imageSource: 'https://metro.co.uk/wp-content/uploads/2023/04/SEI_128990932-7165.jpg?quality=90&strip=all',
        name: 'Repair Center Name 4',
        address: '1010 Fix Street, City 4',
        phoneNumber: '333-333-3333',
        opens: '9 AM to 5 PM',
        description: 'Your solution for all electronic problems.',
        popular: false,
    },
    {
        id: 9,
        imageSource: 'https://metro.co.uk/wp-content/uploads/2023/04/SEI_128990932-7165.jpg?quality=90&strip=all',
        name: 'Repair Center Name 5',
        address: '555 Gadget Ave, City 5',
        phoneNumber: '777-777-7777',
        opens: '7 AM to 7 PM',
        description: 'Quality repairs at your convenience.',
        popular: false,
    },
];

const RepairCenterPopular = () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const handleCardPress = (id) => {
        setSelectedCardIndex(id);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ marginTop: 30 }}>
                {repairCenterData.map((center, index) => (
                    <RepairCenterCard
                        key={index}
                        imageSource={center.imageSource}
                        name={center.name}
                        address={center.address}
                        phoneNumber={center.phoneNumber}
                        opens={center.opens}
                        description={center.description}
                        popular={center.popular}
                        isSelected={selectedCardIndex === center.id}
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

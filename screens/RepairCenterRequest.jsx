import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import RepairCenterPendingRequests from "../components/repair/RepairCenterPendingRequests";
import RepairCenterOnGoingRequests from "../components/repair/RepairCenterOnGoingRequests";
import RepairCenterCompletedRequests from "../components/repair/RepairCenterCompletedRequests";
import RepairFilterButton from "../components/repair/RepairFilterButton";

const RepairCenterRequest = () => {
    const [activeButton, setActiveButton] = useState("pending");

    const handleRequestTypes = (type) => {
        setActiveButton(type);
    }

    let renderedComponent;
    if (activeButton === 'pending') {
        renderedComponent = <RepairCenterPendingRequests />;
    } else if (activeButton === 'on-going') {
        renderedComponent = <RepairCenterOnGoingRequests />;
    } else if (activeButton === 'completed') {
        renderedComponent = <RepairCenterCompletedRequests />;
    }

    return (
        <View>
            <Text style={styles.header}>Repair Requests</Text>

            {/* filtration chips */}
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                <RepairFilterButton text="Pending" onPress={() => handleRequestTypes("pending")} clicked={activeButton === "pending"} />
                <RepairFilterButton text="On-going" onPress={() => handleRequestTypes("on-going")} clicked={activeButton === "on-going"} />
                <RepairFilterButton text="Completed" onPress={() => handleRequestTypes("completed")} clicked={activeButton === "completed"} />
            </View>

            {/* Render the selected Repair Center component */}
            {renderedComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
});

export default RepairCenterRequest;

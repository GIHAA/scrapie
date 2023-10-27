import { ScrollView, StyleSheet, View, Text } from "react-native";
import RepairRequestOnGoingCard from "./RepairRequestOnGoingCard";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

const getRepairCenterById = async (repairCenterId) => {
    try {
        const repairCenterRef = doc(db, "repair-centers", repairCenterId);
        const repairCenterDoc = await getDoc(repairCenterRef);

        if (repairCenterDoc.exists()) {
            const repairCenterData = repairCenterDoc.data();
            return repairCenterData;
        } else {
            console.error("Repair center document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching repair center data:", error);
        return null;
    }
};

const getUserById = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData;
        } else {
            console.error("User center document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

const fetchRepairCenterRequests = async ({ status }) => {
    try {
        const requestsCollection = collection(db, "repair-center-request");
        const requestsQuery = query(requestsCollection, where("status", "==", status));

        const querySnapshot = await getDocs(requestsQuery);
        const data = [];

        for (const doc of querySnapshot.docs) {
            const rawData = doc.data();
            const repairCenterData = await getRepairCenterById(rawData.repairCenterId);
            const userData = await getUserById(rawData.userId);
            const processedData = {
                id: doc.id,
                budget: parseInt(rawData.budget),
                dateTime: new Date(rawData.dateTime),
                days: parseInt(rawData.days),
                image: rawData.image,
                item: rawData.item,
                repairCenter: repairCenterData,
                status: rawData.status,
                user: userData,
            };
            data.push(processedData);
        };
        return data;
    } catch (error) {
        console.error("Error fetching repair centers:", error);
    }
};

const RepairCenterOnGoingRequests = () => {
    const [onGoingRequests, setOnGoingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRepairCenterRequests({ status: "on-going" });
                setOnGoingRequests(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            ) : onGoingRequests && onGoingRequests.length > 0 ? (
                onGoingRequests.map((request, index) => (
                    <RepairRequestOnGoingCard
                        key={index}
                        imageSource={request.image}
                        name={request.repairCenter?.name || 'N/A'}
                        address={request.repairCenter?.latitude || 'N/A'}
                        budget={request.budget}
                        requestedAt={request.dateTime.toLocaleString()}
                        deliveryAt={request.deliveryAt.toLocaleString()}
                    />
                ))
            ) : (
                <Text>No pending requests found.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {},
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default RepairCenterOnGoingRequests;

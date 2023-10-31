import { ScrollView, StyleSheet, View, Text } from "react-native";
import RepairRequestOnGoingCard from "./RepairRequestOnGoingCard";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getUserData = async () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const usersCollection = collection(db, "users");
                const userQuery = query(usersCollection, where("email", "==", userEmail));
                try {
                    const querySnapshot = await getDocs(userQuery);
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const userData = userDoc.data();
                        const userId = userDoc.id;
                        const userDataWithId = { ...userData, id: userId };
                        resolve(userDataWithId);
                    } else {
                        console.error("User document not found.");
                        reject("User document not found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    reject(error);
                }
            } else {
                console.error("User not authenticated.");
                reject("User not authenticated");
            }
        });
    });
};

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

const fetchRepairCenterRequests = async ({ status, userId }) => {
    try {
        const requestsCollection = collection(db, "repair-center-request");
        let requestsQuery = requestsCollection;
        requestsQuery = query(requestsQuery, where("status", "==", status));
        requestsQuery = query(requestsQuery, where("userId", "==", userId));

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
            const userData = await getUserData();
            try {
                const data = await fetchRepairCenterRequests({ status: "on-going", userId: userData.id });
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
                        deliveredAt={request.deliveryAt ? request.deliveryAt.toLocaleString() : 'N/A'}
                    />
                ))
            ) : (
                <Text>No pending requests found.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        minHeight: "100%",
    },
    loadingContainer: {
        flex: 1,
    },
});

export default RepairCenterOnGoingRequests;

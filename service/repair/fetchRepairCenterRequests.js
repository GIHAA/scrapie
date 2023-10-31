import { db } from "../../firebase.config";
import { getDocs, collection, query, where } from "firebase/firestore";
import getRepairCenterById from "./getRepairCenterById";
import getUserById from "./getUserById";

const fetchRepairCenterRequests = async ({ setPendingRequests, status }) => {
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

        setPendingRequests(data);
    } catch (error) {
        console.error("Error fetching repair centers:", error);
    }
};

export default fetchRepairCenterRequests;

import { db } from "../../firebase.config";
import { getDocs, collection } from "firebase/firestore";

const fetchRepairCenters = async ({setRepairCenterData}) => {
    try {
        const querySnapshot = await getDocs(collection(db, "repair-centers"));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        setRepairCenterData(data);
    } catch (error) {
        console.error("Error fetching repair centers:", error);
    }
};

export default fetchRepairCenters;

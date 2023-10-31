import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

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

export default getRepairCenterById;

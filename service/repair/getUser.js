import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";

const getUserData = async (data) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userEmail = user.email;

            const usersCollection = collection(db, "users");
            const userQuery = query(
                usersCollection,
                where("email", "==", userEmail)
            );

            getDocs(userQuery)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const userData = userDoc.data();
                        const userId = userDoc.id;
                        const userDataWithId = { ...userData, id: userId };
                        data(userDataWithId)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });

                return null;
        }
    });
};

export default getUserData;

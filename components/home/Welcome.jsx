import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.config";
import { getDocs, doc, collection, query, where } from "firebase/firestore";

const Welcome = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");


  useEffect(() => {
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

              setName(userData.name);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });

  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, 2)}>
          Good Day, {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="what are you looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

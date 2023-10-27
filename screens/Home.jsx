import { View , StyleSheet, Button , Text , TouchableOpacity , TextInput} from "react-native";
import React , { useEffect , useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headlng from "../components/home/Headlng";
import ProductRow from "../components/product/ProductRow";
import { COLORS , SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.config";
import { getDocs, doc, collection, query, where } from "firebase/firestore";
import { Feather, Ionicons } from "@expo/vector-icons";


const Home = () => {

  const [name, setName] = useState("");
  const navigation = useNavigation();

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
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
        </View>
      </View>
      <ScrollView>
      <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, 2)}>
          Good Morning, {name.charAt(0).toUpperCase() + name.slice(1)}
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
          <Carousel />
          <Headlng />
          <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  testStyle: {
      fontFamily: "bold",
      fontSize: 40
  },
  appBarWrapper: {
      marginHorizontal: 22,
      marginTop: SIZES.small
  },
  appBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  location: {
      fontFamily: "semibold",
      fontSize: SIZES.medium,
      color : COLORS.gray
  },
  cartCount: {
      position:"absolute",
      bottom: 16,
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "green",
      justifyContent: "center",
      zIndex: 999
  },
  cartCount: {
      position: "absolute", 
      bottom : 16,
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "green",
      justifyContent: "center",
      zIndex: 999
  },
  cartNumber: {
      fontFamily: "regular",
      fontWeight: "600",
      fontSize: 10,
      color: COLORS.lightWhite
  },
  container : {
    width: "100%",
    
},
container2 : {
    height: 100,
    borderColor: COLORS.black,
    borderWidth: 2
},
welcomeText: (color , top) => ({
    fontFamily: "bold",
    fontSize: SIZES.xxLarge -15,
    marginTop: top,
    color: color,
    marginHorizontal: 12
}),
searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50
},
searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small
},
searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,

},
searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small
},
searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
}
})

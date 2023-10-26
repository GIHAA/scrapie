import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Fav = ({}) => {

  const navigation = useNavigation();

  const handleRecycleButtonClick = () => {
    const data = { item: "Shoes" };
    navigation.navigate("Recycle", { data });
  };

  return (
    <TouchableOpacity
      onPress={handleRecycleButtonClick}
      style={{
        height: 55,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "white",
        borderColor: "green",
        borderWidth: 2,
        padding: 10,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "green", fontSize: 20 }}>Recycle</Text>
        <View style={{ marginLeft: 10 }}>
          <AntDesign name="arrowright" size={24} color="green" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Fav;

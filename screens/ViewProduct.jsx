import LottieView from "lottie-react-native";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Linking, // Import the Linking module
} from "react-native";
import { COLORS } from "../constants";

const ViewProduct = ({ route }) => {

    const { data } = route.params;

   // const { image , seller , description , item , price , phone } = route.params;
  
  
//     const data = {
//     image: "https://firebasestorage.googleapis.com/v0/b/scrapie-85d87.appspot.com/o/images%2Fgihaaaaa?alt=media&token=e157ba69-2070-41b3-937d-4b13f21aa533",
//     seller: "gihan",
//     description: "rrrrrrrr rrrr sadsad asdsa dsd adasd asd asd",
//     item: "rrrrr",
//     price: 100,
//     phone: "0710816191",
//   }

  const callSeller = () => {
    const phoneNumber = data.phone;
  Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View>
      <Image
        animation="fadeIn"
        duration={1000}
        style={{ height: "55%", width: "100%" }}
        source={{
          uri: data.image,
        }}
        placeholder="image"
        contentFit="cover"
      />

      <View style={{ backgroundColor: COLORS.white, height: "50%" }}>
        <View style={{ marginLeft : 10 , marginRight : 10}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              paddingTop: 15,
              paddingBottom: 15,
              borderRadius: 40,
            }}
          >
            {data.item}
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
            Price : <Text style={{ fontWeight: "500" }}>{data.price}</Text>
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Seller :{" "}
            <Text style={{ fontWeight: "500" }}>{data.seller}</Text>
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Description :{" "}
            <Text style={{ fontWeight: "500" }}>{data.description}</Text>
          </Text>

          <TouchableOpacity
            onPress={callSeller}
            style={{
              marginTop : 13,
              backgroundColor: COLORS.primary,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Call Seller
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({});

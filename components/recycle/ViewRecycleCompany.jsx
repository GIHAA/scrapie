import React, { useState } from "react";
import {
  Entypo,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import AppBar from "./AppBar";

const ViewRecycleCompany = ({ route }) => {
  const { recycleCompany, recycleItem } = route.params;

  console.log("View Recycle Company Screen Company", recycleCompany);
  console.log("View Recycle Company Screen Item", recycleItem);

  const navigation = useNavigation();

  const handlePickUp = () => {
    const recycleRequest = { type: "Pick_Up"};
    navigation.navigate("PickUp", { recycleCompany, recycleItem, recycleRequest });
  }

  const handleDropOff = () => {
    const recycleRequest = { type: "Drop_Off"};
    navigation.navigate("DropOff", { recycleCompany, recycleItem, recycleRequest });
  }

  const { width, height } = Dimensions.get('window')

  return (
    // <View style={{ flex: 1, backgroundColor: "#000" }}>
    //   <View
    //     style={{
    //       padding: 20,
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //     }}
    //   >
    //     {/* <Feather name="arrow-left" size={24} color="black" />
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <Feather name="search" size={24} color="black" style={{ marginRight: 20 }} />
    //             <Feather name="more-vertical" size={24} color="black" />
    //         </View> */}
    //   </View>

    //   <ScrollView style={{ flex: 1, padding: 20 }}>
    //     <View
    //       style={{ flexDirection: "row" }}
    //     >
    //       <Entypo name="grooveshark" size={80} color= {COLORS.primary} />
    //       <View style={{ marginLeft: 20 }}>
    //         <Text style={{ fontSize: 25, color: "#1f2023" }}>
    //           {recycleCompany.name}
    //         </Text>
    //         <Text style={{ fontSize: 13, marginTop: 10, color: "#048533" }}>
    //           Tree Friend
    //         </Text>
    //       </View>
    //     </View>

    //     <View>
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           justifyContent: "space-around",
    //           marginVertical: 20,
    //         }}
    //       >
    //         <View style={{ justifyContent: "center", alignItems: "center" }}>
    //           <Text style={{ fontSize: 16, color: "#1f2023" }}>4.5</Text>
    //           <Text style={{ fontSize: 12, color: "#d9d9d9" }}>4K reviews</Text>
    //         </View>

    //         <View style={{ justifyContent: "center", alignItems: "center" }}>
    //           <Text style={{ fontSize: 16, color: "#1f2023" }}>1M+</Text>
    //           <Text style={{ fontSize: 12, color: "#d9d9d9" }}>Recycles</Text>
    //         </View>

    //         <View style={{ justifyContent: "center", alignItems: "center" }}>
    //           <Text style={{ fontSize: 16, color: "#1f2023" }}>1K</Text>
    //           <Text style={{ fontSize: 12, color: "#d9d9d9" }}>Carbon Reduced</Text>
    //         </View>
    //       </View>


    //       <View
    //         style={{ flexDirection: "row", justifyContent: "space-between" }}
    //       >
    //         <TouchableOpacity
    //           style={{
    //             paddingHorizontal: 8,
    //             paddingVertical: 6,
    //             borderWidth: 1,
    //             backgroundColor: COLORS.primary,
    //             borderRadius: 10,
    //             width: 180,
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //           onPress={() => handleDropOff()}
    //         >
    //           <Text
    //             style={{
    //               fontSize: 16,
    //               color: "#000",
    //               textAlign: "center",
    //             }}
    //           >
    //             Drop Off
    //           </Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           style={{
    //             flexDirection: "row",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             paddingHorizontal: 8,
    //             paddingVertical: 6,
    //             borderWidth: 1,
    //             backgroundColor: COLORS.primary,
    //             borderRadius: 10,
    //             width: 180,
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //           onPress={() => handlePickUp()}
    //         >
    //           <Text
    //             style={{
    //               fontSize: 16,
    //               color: "#000",
    //               textAlign: "center",
    //               marginLeft: 10,
    //             }}
    //           >
    //             Pick Up
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     <View>
    //       <ScrollView
    //         style={{ flexGrow: 0, marginBottom: 20, marginTop: 20 }}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //       >
    //         <Image
    //           source={{ uri: recycleCompany.image }}
    //           style={{
    //             width:300,
    //             height: 200,
    //             borderRadius: 20,
    //             backgroundColor: "#048533",
    //           }}
    //         />
    //       </ScrollView>
    //     </View>

    //     <View>
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <Text style={{ fontSize: 16, color: "#1f2023" }}>About</Text>
    //         <Feather name="arrow-right" size={24} color="#048533" />
    //       </View>

    //       <Text
    //         style={{ fontSize: 12, color: "#d9d9d9", textAlign: "justify" }}
    //       >
    //         {recycleCompany.description}
    //       </Text>

    //       <View
    //         style={{
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //           marginTop: 20,
    //         }}
    //       >
    //         <View
    //           style={{
    //             borderWidth: 1,
    //             borderColor: "#1f2023",
    //             borderRadius: 20,
    //             paddingHorizontal: 10,
    //             paddingVertical: 5,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>Eco</Text>
    //         </View>

    //         <View
    //           style={{
    //             borderWidth: 1,
    //             borderColor: "#1f2023",
    //             borderRadius: 20,
    //             paddingHorizontal: 10,
    //             paddingVertical: 5,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>Committed</Text>
    //         </View>

    //         <View
    //           style={{
    //             borderWidth: 1,
    //             borderColor: "#1f2023",
    //             borderRadius: 20,
    //             paddingHorizontal: 10,
    //             paddingVertical: 5,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>Best #10</Text>
    //         </View>
    //       </View>
    //     </View>

    //     <View>
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "space-between",
    //           marginTop: 20,
    //         }}
    //       >
    //         <Text style={{ fontSize: 16, color: "#1f2023" }}>Reviews</Text>
    //         <Feather name="arrow-right" size={24} color="#048533" />
    //       </View>

    //       <View>
    //         <View style={{ flexDirection: "row", alignItems: "center" }}>
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>5</Text>
    //           <View
    //             style={{
    //               flex: 1,
    //               height: 6,
    //               backgroundColor: "#d9d9d9",
    //               marginLeft: 10,
    //               marginBottom: 3,
    //               borderRadius: 20,
    //             }}
    //           >
    //             <View
    //               style={{
    //                 width: "60%",
    //                 height: 6,
    //                 position: "absolute",
    //                 backgroundColor: "#048533",
    //                 borderRadius: 20,
    //               }}
    //             />
    //           </View>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginTop: 2,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>4</Text>
    //           <View
    //             style={{
    //               flex: 1,
    //               height: 6,
    //               backgroundColor: "#d9d9d9",
    //               marginLeft: 10,
    //               marginBottom: 3,
    //               borderRadius: 20,
    //             }}
    //           >
    //             <View
    //               style={{
    //                 width: "20%",
    //                 height: 6,
    //                 position: "absolute",
    //                 backgroundColor: "#048533",
    //                 borderRadius: 20,
    //               }}
    //             />
    //           </View>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginTop: 2,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>3</Text>
    //           <View
    //             style={{
    //               flex: 1,
    //               height: 6,
    //               backgroundColor: "#d9d9d9",
    //               marginLeft: 10,
    //               marginBottom: 3,
    //               borderRadius: 20,
    //             }}
    //           >
    //             <View
    //               style={{
    //                 width: "5%",
    //                 height: 6,
    //                 position: "absolute",
    //                 backgroundColor: "#048533",
    //                 borderRadius: 20,
    //               }}
    //             />
    //           </View>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginTop: 2,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>2</Text>
    //           <View
    //             style={{
    //               flex: 1,
    //               height: 6,
    //               backgroundColor: "#d9d9d9",
    //               marginLeft: 10,
    //               marginBottom: 3,
    //               borderRadius: 20,
    //             }}
    //           >
    //             <View
    //               style={{
    //                 width: "10%",
    //                 height: 6,
    //                 position: "absolute",
    //                 backgroundColor: "#048533",
    //                 borderRadius: 20,
    //               }}
    //             />
    //           </View>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginTop: 2,
    //           }}
    //         >
    //           <Text style={{ fontSize: 14, color: "#1f2023" }}>1</Text>
    //           <View
    //             style={{
    //               flex: 1,
    //               height: 6,
    //               backgroundColor: "#d9d9d9",
    //               marginLeft: 10,
    //               marginBottom: 3,
    //               borderRadius: 20,
    //             }}
    //           >
    //             <View
    //               style={{
    //                 width: "5%",
    //                 height: 6,
    //                 position: "absolute",
    //                 backgroundColor: "#048533",
    //                 borderRadius: 20,
    //               }}
    //             />
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={{ height: 50 }} />
    //   </ScrollView>
    // </View>



    
    <View style={{ flex: 1, backgroundColor: COLORS.offwhite }}>
    <AppBar title={recycleCompany.name}></AppBar>
    <View >
        <Image source={{ uri: recycleCompany.image }} style={{ width: width, height: 300, resizeMode: 'cover' }} />
    </View>

    <View>

        <ScrollView style={{ padding: 20, flexGrow: 0}} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 18, color:COLORS.primary, opacity: 1 }}>{recycleCompany.name}</Text>
            <Text style={{  fontSize: 14, color: '#000', opacity: 0.4 }}>Trees are our friends!</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                <FontAwesome5 name="star" size={20} color={COLORS.primary} />
                <FontAwesome5 name="star" size={20} color={COLORS.primary} />
                <FontAwesome5 name="star" size={20} color={COLORS.primary} />
                <FontAwesome5 name="star" size={20} color={COLORS.primary} />
                <Text style={{  fontSize: 16, color: '#000', marginLeft: 10, marginBottom: -8 }}>4/5</Text>
            </View>
            <Text style={{  fontSize: 14, color: '#000', opacity: 1, marginTop: 20, lineHeight: 23, marginBottom: 20 }}>{recycleCompany.description}</Text>



            <View
            style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 8,
                paddingVertical: 15,
                borderWidth: 1,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
                borderRadius: 10,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleDropOff()}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFF",
                  textAlign: "center",
                }}
              >
                Drop Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 6,
                borderWidth: 1,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
                borderRadius: 10,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handlePickUp()}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFF",
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                Pick Up
              </Text>
            </TouchableOpacity>
          </View>




            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.primary
            }}>
                <Text style={{ fontSize: 16, color: '#000', }}>Address</Text>
                <Text style={{  fontSize: 16, color: '#000', opacity: 0.5 }}>{recycleCompany?.address || "Malabe"}</Text>
            </View>

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.primary
            }}>
                <Text style={{ fontSize: 16, color: '#000', }}>Contact</Text>
                <Text style={{  fontSize: 16, color: '#000', opacity: 0.5 }}>{recycleCompany?.contact || "076 560 5678"}</Text>
            </View>

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.primary
            }}>
                <Text style={{ fontSize: 16, color: '#000', }}>Opening date</Text>
                <Text style={{  fontSize: 16, color: '#000', opacity: 0.5 }}>March 23, 2020</Text>
            </View>

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.primary
            }}>
                <Text style={{ fontSize: 16, color: '#000', }}>SLS</Text>
                <Text style={{  fontSize: 16, color: '#000', opacity: 0.5 }}>Verified</Text>
            </View>

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.primary
            }}>
                <Text style={{ fontSize: 16, color: '#000', }}>Price</Text>
                <Text style={{  fontSize: 16, color: '#000', opacity: 0.5 }}>$19.90</Text>
            </View>

            <TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center' }}>Add To Cart</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} />

        </ScrollView>
    </View>
</View>
  );
};

export default ViewRecycleCompany;

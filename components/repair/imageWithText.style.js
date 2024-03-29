import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: "90%",
        justifyContent: "center",
        height: 240,
        // marginEnd: 22,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        marginLeft: SIZES.small / 2,
        marginTop: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: "hidden",
    },
    image: {
        aspectRatio: 1,
        resizeMode: "cover",
    },
    details: {
        padding: SIZES.small,
    },
    supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
    },
    addBtn: {
        position: "absolute",
    },
});

export default styles;

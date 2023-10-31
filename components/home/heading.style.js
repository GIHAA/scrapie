import { StyleSheet } from "react-native";
import { COLORS , SIZES } from "../../constants";

const styles = StyleSheet.create({
    continer: {
        marginTop: SIZES.medium,
        marginBottom: SIZES.xxLarge,
        marginHorizontal: 12
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    headerTitle: {
        fontFamily: "semibold",
        fontSize: SIZES.xLarge -2,
    }

})

export default styles
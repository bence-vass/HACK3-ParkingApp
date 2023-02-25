import {Text, TouchableOpacity, View} from "react-native";
import COLORS from "../utils/COLORS";

const Tier = ({price, name, onPress, color}) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: color ? color : COLORS.DARK_BLUE,
            borderRadius: 10,
            height: 130,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15
        }} activeOpacity={.7} onPress={onPress}>
            <Text style={{
                color: COLORS.WHITE,
                fontSize: 36,
                fontWeight: 'bold'
            }}>{name}</Text>
            <Text style={{
                color: COLORS.WHITE,
                fontSize: 14,
            }}>Alapár: {price} DP</Text>
        </TouchableOpacity>
    )
}

export default Tier

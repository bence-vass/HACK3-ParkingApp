import {View} from "react-native";
import COLORS from "../utils/COLORS";

const DefaultWrapper = ({children, style}) => {

    return(<View style={{...{
        borderWidth: 3,
        borderRadius: 15,
        borderColor: COLORS.BLUE,
        margin: 13,
        padding: 13,
        alignItems: 'center',
    }, ...style}}>{children}</View>)
}
export default DefaultWrapper

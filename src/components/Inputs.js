import {TextInput} from "react-native";
import COLORS from "../utils/COLORS";

export const DefaultTextInput = ({onChange, value, secureTextEntry}) => {
    return <TextInput onChangeText={onChange} value={value} secureTextEntry={secureTextEntry} style={{
        backgroundColor: COLORS.WHITE,
        color: COLORS.DARK_BLUE,
        fontSize: 20,
        padding: 10,
        borderRadius: 15,
        textAlign: 'center',
    }}/>
}

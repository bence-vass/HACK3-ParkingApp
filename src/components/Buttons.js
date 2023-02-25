import {Image, TouchableOpacity, Text} from "react-native";
import COLORS from "../utils/COLORS";

const FigurePic = require('../../assets/go.png')


export const GoButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={() => {
            if (onPress) {
                onPress()
            }
        }} style={{
            backgroundColor: '#00A500',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 13,
            padding: 13,
        }}>
            <Image source={FigurePic} style={{width: 50, height: 50}}/>
        </TouchableOpacity>
    )
}


export const OrangeButton = ({title, onPress, wrapperStyle}) => {
    return (
        <TouchableOpacity style={{...{
            backgroundColor: COLORS.ORANGE,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 7,
        }, ...wrapperStyle}} onPress={()=>onPress()}>
            <Text style={{
                color: COLORS.WHITE,
                fontSize: 22,

            }}>{title}</Text>
        </TouchableOpacity>
    )
}

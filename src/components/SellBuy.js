import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import COLORS from "../utils/COLORS";
import DefaultWrapper from "./DefaultWrapper";
import {getRandomInt} from "../utils/randomGenerator";


const styles = StyleSheet.create({
    valueContainer: {
        backgroundColor: COLORS.WHITE,
        margin: 10,
        borderRadius: 7,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },

})

const SellBuy = ({haveTicket, spot}) => {
    return (
        <DefaultWrapper style={{
            flexDirection: 'row',
        }}>
            <View style={{
                //backgroundColor: 'blue',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    //backgroundColor: 'lightblue',
                    width: '100%',
                    alignItems: 'center',

                }}>
                    <View style={styles.valueContainer}>
                        <Text>{spot ? "X"+spot : "Spot"}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                        <Text>{spot ? getRandomInt(1, 20)+ " DP" : "Credit"}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                        <Text>{spot ? "23.02.28" : "Date"}</Text>
                    </View>
                </View>
            </View>
            <View style={{
                //backgroundColor: 'red',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.ORANGE,
                        borderRadius: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                        <Text style={{color: COLORS.WHITE}}>Adás/Vétel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DefaultWrapper>
    )
}


export default SellBuy

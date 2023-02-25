import {Button, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar} from 'react-native';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import COLORS from "../utils/COLORS";

const HeaderContainerPadding = 20
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.BLUE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + HeaderContainerPadding : 0,
        padding: HeaderContainerPadding,
        margin: 0,

    },
    headerName: {
        flex: 1,
    },
    headerText: {
        color: COLORS.WHITE,
        fontFamily: 'Helvetica Neue LT',
        fontSize: 22,
        textAlign: 'center',

    },
    hamburgerBg: {
        backgroundColor: COLORS.WHITE,
        width: 35,
        height: 35,
        left: 23,
        top: Platform.OS === "android" ? StatusBar.currentHeight + HeaderContainerPadding : 0,
        position: 'absolute',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }

});


const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerName}>
                <Text style={styles.headerText}>K&H parkURmoney</Text>
            </View>
            <View style={styles.hamburgerBg}>
                <TouchableOpacity onPress={() => {
                    navigation.openDrawer()
                }} style={{position: 'relative', flex: 1, backgroundColor: 'pink'}}>
                    <View style={{backgroundColor: 'red', flex:1}}>
                        <Text/>
                    </View>



                </TouchableOpacity>
            </View>
            <ExpoStatusBar/>

        </View>
    )
}


export default Header


/*
<View style={{
                            backgroundColor: '#888888',
                            width: '70%',
                            height: 3,
                            borderRadius: 10,
                            marginBottom: 3,
                            position: 'relative',
                        }}/>

 */

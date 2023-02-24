import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";

const BLUE = '#3797d5'

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: BLUE,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerName: {
        color: '#fff',
        fontFamily: 'Sans-serif',
        fontSize: 22,
        textAlign: 'center',
        padding: 20,
        width: '100%',
        left: 0
    },
    hamburgerBg: {
        backgroundColor: "#fff",
        width: 35,
        height: 35,
        marginLeft: 23,
        position: 'absolute',
        borderRadius: 10,
    }

});


const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <StatusBar style={'light'} backgroundColor={BLUE}/>
            <View style={styles.hamburgerBg}></View>
            <Text style={styles.headerName}>K&H parkURmoney</Text>

        </View>
    )
}


export default Header

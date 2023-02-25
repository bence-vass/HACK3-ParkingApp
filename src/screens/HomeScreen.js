import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {useState} from "react";


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Helvetica Neue LT',
        color: COLORS.DARK_BLUE,
        marginBottom: 4,
    },

    container: {
        backgroundColor: COLORS.BRIGHT_BLUE,
        flex: 1,
    },
    userContainer: {
        backgroundColor: COLORS.LIGHT_BLUE,
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
        margin: 0,
        padding: 20,

    }
});


const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()

    const [selectedSpot, setSelectedSpot] = useState({})


    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <SafeAreaView edges={['bottom', 'left', 'right']}>

                <View style={styles.userContainer}>
                    <Text style={{...styles.text, ...{fontSize: 18, marginBottom: 0}}}>Kovacs Istvan</Text>
                    {user?.email ? <Text style={{...styles.text, ...{fontSize: 10,}}}>{user.email}</Text> : null}
                    <Text style={{...styles.text, ...{fontSize: 20,}}}>AA - AA - 123</Text>
                    <Text style={{...styles.text, ...{fontSize: 20,}}}>állandó parkolóhely: A12</Text>

                </View>


                <View style={{
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: COLORS.BLUE,
                    margin: 13,
                    padding: 13,
                    alignItems: 'center',
                    minHeight: 100,
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                }}>

                    <ParkingRow row={0} selected={selectedSpot} fn={setSelectedSpot}/>
                    <View style={{marginBottom: 100}}/>
                    <ParkingRow row={1} selected={selectedSpot} fn={setSelectedSpot}/>
                    <View style={{marginBottom: 100}}/>
                    <ParkingRow row={2} selected={selectedSpot} fn={setSelectedSpot}/>
                    <View style={{marginBottom: 80}}/>


                </View>


            </SafeAreaView>


        </View>
    );
}

export default HomeScreen;


/*
{user?.isAdmin ? <Button title={'Dashboard'} onPress={()=>navigation.navigate('dashboard')}/>: null}
                <Button title={"Calendar"} onPress={()=>navigation.navigate('calendar')}/>
                <Button title={"Sign out"} onPress={()=>signOut(auth)}/>
 */


const ParkingSpace = ({row, col, selected, fn, last}) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: COLORS.WHITE,
            borderWidth: 3,
            borderRightWidth: last ? 3 : 0,
            borderColor: COLORS.DARK_BLUE,
            minWidth: 40,
            height: 100,
            flex: 1,
        }} onPress={() => fn({row:row ,col:col})} activeOpacity={1}>
            <View>
                {selected && (selected.row === row && selected.col === col) ? <View style={{
                    height: 10,
                    width: 10,
                    backgroundColor: 'red',

                }}/> : null}
            </View>
        </TouchableOpacity>

    )
}

const ParkingRow = ({row, fn, selected}) => {
    return (
        <View style={{
            height: 100,
            minWidth: 30,
            flex: 1,
            flexDirection: 'row',
            marginBottom: 20,
        }}>
            <ParkingSpace row={row} col={0} fn={fn} selected={selected}/>
            <ParkingSpace row={row} col={1} fn={fn} selected={selected}/>
            <ParkingSpace last row={row} col={2} fn={fn} selected={selected}/>
            <View style={{width: 30}}/>
            <ParkingSpace row={row} col={3} fn={fn} selected={selected}/>
            <ParkingSpace row={row} col={4} fn={fn} selected={selected}/>
            <ParkingSpace last row={row} col={5} fn={fn} selected={selected}/>
        </View>
    )
}

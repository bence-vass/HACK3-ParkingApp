import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {useEffect, useState} from "react";
import SellBuy from "../components/SellBuy";
import DefaultWrapper from "../components/DefaultWrapper";
import {useIsFocused} from "@react-navigation/native";
import {GoButton} from "../components/Buttons";
import Chart from "../components/Chart";
import {getRandomInt} from "../utils/randomGenerator";

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

const spot = getRandomInt(0,500)

const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()

    const [selectedSpot, setSelectedSpot] = useState({})
    const [selectedDates, setSelectedDates] = useState({})

    const isFocused = useIsFocused()
    useEffect(() => {
        setSelectedSpot({})
        setSelectedDates({})
    }, [isFocused])
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <ScrollView>
                <SafeAreaView edges={['bottom', 'left', 'right']}>

                    <View style={styles.userContainer}>
                        <Text style={{...styles.text, ...{fontSize: 18, marginBottom: 0}}}>Kovacs Istvan</Text>
                        {user?.email ? <Text style={{...styles.text, ...{fontSize: 10,}}}>{user.email}</Text> : null}
                        <Text style={{...styles.text, ...{fontSize: 12,}}}>AA - AA - 123</Text>
                        <Text style={{...styles.text, ...{fontSize: 16,}}}>2023-02-28</Text>
                        <Text style={{...styles.text, ...{fontSize: 12,}}}>állandó parkolóhely: A12</Text>

                    </View>


                    <View style={{
                        borderWidth: 3,
                        borderRadius: 15,
                        borderColor: COLORS.BLUE,
                        margin: 13,
                        padding: 13,
                        alignItems: 'center',
                        minHeight: 100,
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                    }}>

                        <ParkingRow row={0} selected={selectedSpot} fn={setSelectedSpot}/>
                        <ParkingRow row={1} selected={selectedSpot} fn={setSelectedSpot}/>
                        <ParkingRow row={2} selected={selectedSpot} fn={setSelectedSpot} last/>


                    </View>
                    {Object.keys(selectedSpot).length === 0 ? <DefaultWrapper>
                        <Text>Az árfolyamhoz válassza ki a parkolóhelyet</Text>
                    </DefaultWrapper> : <Chart spot={spot}/> }

                    <SellBuy spot={spot}/>
                    <GoButton/>

                </SafeAreaView>
            </ScrollView>

        </View>
    );
}

export default HomeScreen;


/*
{user?.isAdmin ? <Button title={'Dashboard'} onPress={()=>navigation.navigate('dashboard')}/>: null}
                <Button title={"Calendar"} onPress={()=>navigation.navigate('calendar')}/>
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
            justifyContent: 'center',
            alignItems: 'center',
        }} onPress={() => fn({row: row, col: col})} activeOpacity={1}>
            <View>
                {selected && (selected.row === row && selected.col === col) ?
                    <View>
                        <View style={{
                            backgroundColor: COLORS.ORANGE,
                            width: 4,
                            height: 50,
                            borderRadius: 3,
                            transform: [{rotate: '45deg'}],
                            position: 'absolute'
                        }}/>
                        <View style={{
                            backgroundColor: COLORS.ORANGE,
                            width: 4,
                            height: 50,
                            borderRadius: 3,
                            transform: [{rotate: '-45deg'}]
                        }}/>
                    </View>
                    : null}


            </View>
        </TouchableOpacity>

    )
}

const ParkingRow = ({last, row, fn, selected}) => {
    return (
        <View style={{
            height: 100,
            minWidth: 30,
            flex: 1,
            flexDirection: 'row',
            marginBottom: last ? 0 : 20,
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

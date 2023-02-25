import {addDoc, collection, getDoc, doc} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {OrangeButton} from "../components/Buttons";


const styles = StyleSheet.create({
    text: {
        color: COLORS.DARK_BLUE,
        fontSize: 18,
    },
});

const sendData = async () => {
    console.log('send data');
    try {
        const docRef = await addDoc(collection(db, 'logs'), {
            smtn: 'hello1'
        });
        console.log("ID: ", docRef.id);
    } catch (e) {
        console.error(e);
    }
}


const SetParkingSpotScreen = ({navigation}) => {
    const {user} = useAuthentication()
    const [spots, setSpots] = useState()
    const isFocused = useIsFocused()
    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(doc(db, 'garages', 'my-garage'))
            if (docSnap.exists()) {
                let data = await docSnap.data()
                setSpots(data)
            }
        }

        fetchData();
    }, [isFocused])


    return (
        <View style={{flex: 1, backgroundColor: COLORS.LIGHT_BLUE}}>
            <Header navigation={navigation}/>
            <SafeAreaView>
                <View style={{padding: 20, alignItems: 'center'}}>
                    <Text style={styles.text}>Available Spots on Property</Text>
                    <Text style={styles.text}>{spots?.available ? spots.available : 0}</Text>
                    <Text style={styles.text}>Reserved Spots</Text>
                    <Text style={{...styles.text, ...{marginBottom: 20}}}>{spots?.reserved ? spots.reserved : 0}</Text>
                    <OrangeButton title={"Setup Reserved Spots"}
                                  onPress={() => navigation.navigate('set-reserved-spots')}/>
                </View>
            </SafeAreaView>

        </View>
    );
}

export default SetParkingSpotScreen;



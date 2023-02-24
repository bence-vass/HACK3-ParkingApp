import {addDoc, collection, getDoc, doc} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import {useEffect, useState} from "react";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(doc(db, 'garages', 'my-garage'))
            if (docSnap.exists()) {
                let data = await docSnap.data()
                setSpots(data)
            }
        }
        console.log('refetch set sparking sot')
        fetchData();
    }, [])

    console.log('render spot screen')

    return (
        <View style={styles.container}>
            <Text>Parking Spot Screen</Text>
            <Text>Available Spots on Property</Text>
            <Text>{spots?.available ? spots.available : 0}</Text>
            <Text>Reserved Spots</Text>
            <Text>{spots?.reserved ? spots.reserved : 0}</Text>
            <Button title={"set reserved"} onPress={()=>navigation.navigate('set-reserved-spots')}/>
            <StatusBar style="auto"/>
        </View>
    );
}

export default SetParkingSpotScreen;



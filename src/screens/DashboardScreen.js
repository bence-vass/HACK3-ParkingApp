import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";


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

const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <View>
            <Header navigation={navigation}/>

            <Text>Dashboard Screen</Text>
            {user?.email ? <Text>{user.email}</Text> : null}

            <Button title={"Parking Spots"} onPress={()=>navigation.navigate('set-parking-spots')}/>
            <Button title={"Set Tiers"} onPress={()=>navigation.navigate('set-tier-overview')}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default HomeScreen;

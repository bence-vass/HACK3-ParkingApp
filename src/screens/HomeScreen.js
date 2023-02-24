import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";


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
        <View style={styles.container}>
            <Text>Home Screen</Text>
            {user?.email ? <Text>{user.email}</Text> : null}
            <Text>Credit: {user?.credit ? user.credit : 0}</Text>

            {user?.isAdmin ? <Button title={'Dashboard'} onPress={()=>navigation.navigate('dashboard')}/>: null}

            <Button title={"Firebase"} onPress={sendData}/>
            <Button title={"Sign out"} onPress={()=>signOut(auth)}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default HomeScreen;

import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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

const ProfileScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <View>
            <Header navigation={navigation}/>
            <SafeAreaView>
                <Text>Profile Screen</Text>
                <Button title={"Sign out"} onPress={()=>signOut(auth)}/>
            </SafeAreaView>


        </View>
    );
}

export default ProfileScreen;

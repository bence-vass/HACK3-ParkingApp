import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});


const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <SafeAreaView style={styles.container}>
            <Header/>
            <Text>Home Screen</Text>
            {user?.email ? <Text>{user.email}</Text> : null}
            <Text>Credit: {user?.credit ? user.credit : 0}</Text>

            {user?.isAdmin ? <Button title={'Dashboard'} onPress={()=>navigation.navigate('dashboard')}/>: null}
            <Button title={"Calendar"} onPress={()=>navigation.navigate('calendar')}/>
            <Button title={"Sign out"} onPress={()=>signOut(auth)}/>

        </SafeAreaView>
    );
}

export default HomeScreen;

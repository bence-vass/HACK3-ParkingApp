import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {signInWithEmailAndPassword } from "firebase/auth";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const LoginScreen = ({navigation}) => {

    const login = async () => {
        console.log('logging in ...');
        let email = "asd@asd.com"
        let password = "password123"

        try {
            const userRef = await signInWithEmailAndPassword (auth, email, password)
            console.log('logged in ', userRef.user.uid)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>

            <Button title={"Login"} onPress={login}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default LoginScreen;

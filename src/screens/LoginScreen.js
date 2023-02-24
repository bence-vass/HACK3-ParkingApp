import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../../firebaseConfig";
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
});


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("asd@asd.com")
    const [password, setPassword] = useState("password123")
    const login = async () => {
        console.log('logging in ...');

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

            <Text>Email</Text>
            <TextInput onChangeText={setEmail} value={email} style={styles.input}/>

            <Text>Password</Text>
            <TextInput onChangeText={setPassword} value={password} style={styles.input} secureTextEntry={true}/>

            <Button title={"Login"} onPress={login}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default LoginScreen;

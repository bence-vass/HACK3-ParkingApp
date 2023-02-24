import {setDoc, collection, doc} from "firebase/firestore";
import {app, db, auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
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


const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState("asd@asd.com")
    const [password, setPassword] = useState("password123")

    const signUp = async () => {
        console.log('signing up...');


        try {
            const userRef = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userRef.user.email)
            const docRef = await setDoc(doc(db, 'users', userRef.user.uid), {
                tier: 1,
                reservedParkingSpot: false,
                credit: 0,
                email: userRef.user.email,
            })
            navigation.navigate('login')
            console.log('account successfully created ', userRef.user.uid)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Sign up Screen</Text>
            <Text>Email</Text>
            <TextInput onChangeText={setEmail} value={email} style={styles.input}/>

            <Text>Password</Text>
            <TextInput onChangeText={setPassword} value={password} style={styles.input} secureTextEntry={true}/>

            <Button title={"Create Acccount"} onPress={signUp}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default SignupScreen;

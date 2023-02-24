import {setDoc, collection, doc} from "firebase/firestore";
import {app, db, auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const SignupScreen = ({navigation}) => {


    const signUp = async () => {
        console.log('signing up...');
        let email = "asd1@asd.com"
        let password = "password123"

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

            <Button title={"Create Acccount"} onPress={signUp}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default SignupScreen;

import {setDoc, collection, doc} from "firebase/firestore";
import {app, db, auth} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {DefaultTextInput} from "../components/Inputs";
import {OrangeButton} from "../components/Buttons";


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
        <View style={{backgroundColor: COLORS.BRIGHT_BLUE, flex: 1}}>
            <Header displayBurger={false} displayBack={true} navigation={navigation}/>



            <SafeAreaView style={{alignContent: 'center', justifyContent: 'center', flex:1}}>
                <View style={{
                    padding: 25,
                    paddingBottom: 55,
                    //backgroundColor: 'red',

                }}>
                    <Text style={{
                        //backgroundColor: 'blue',
                        alignSelf: 'center',
                        fontSize: 20,
                        marginBottom: 15,
                        color: COLORS.DARK_BLUE,
                    }}>Email</Text>
                    <DefaultTextInput onChange={setEmail} value={email}/>


                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginBottom: 15,
                        marginTop: 50,
                        color: COLORS.DARK_BLUE,
                    }}>Password</Text>
                    <DefaultTextInput onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    <OrangeButton title={"Create Account"} onPress={signUp} wrapperStyle={{
                        width: 200,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}/>
                </View>


            </SafeAreaView>

        </View>
    );
}

export default SignupScreen;

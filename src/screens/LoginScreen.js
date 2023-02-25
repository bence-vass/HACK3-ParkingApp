import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {signInWithEmailAndPassword } from "firebase/auth";
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
        <View style={{backgroundColor: COLORS.BRIGHT_BLUE, flex: 1}}>
            <Header displayBurger={false} displayBack={true} navigation={navigation} navigate_to={'sign-up'}/>
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
                    <OrangeButton title={"Login"} onPress={login} wrapperStyle={{
                        width: 200,
                        alignSelf: 'center',
                        marginTop: 50,
                    }}/>
                </View>


            </SafeAreaView>


        </View>
    );
}

export default LoginScreen;

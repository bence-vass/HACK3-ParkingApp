import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const LandingScreen = ({navigation}) => {
    return (
        <View>
            <Header displayBurger={false}/>
            <SafeAreaView>
                <Text>Landing Screen</Text>

                <Button title={"Login"} onPress={()=> navigation.navigate('login')}/>
                <Button title={"Sign up"} onPress={()=> navigation.navigate('sign-up')}/>

            </SafeAreaView>

        </View>
    );
}

export default LandingScreen;

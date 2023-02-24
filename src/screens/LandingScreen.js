import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";


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
        <View style={styles.container}>
            <Text>Landing Screen</Text>

            <Button title={"Login"} onPress={()=> navigation.navigate('login')}/>
            <Button title={"Sign up"} onPress={()=> navigation.navigate('sign-up')}/>

            <StatusBar style="auto"/>
        </View>
    );
}

export default LandingScreen;

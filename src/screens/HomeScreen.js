import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../../firebaseConfig";
import {Button, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Helvetica Neue LT',
        color: COLORS.DARK_BLUE,
        marginBottom: 4,
    },

    container: {
        backgroundColor: COLORS.BRIGHT_BLUE,
        flex: 1,
    },
    userContainer: {
        backgroundColor: COLORS.LIGHT_BLUE,
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
        margin: 0,
        padding: 20,

    }
});


const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <SafeAreaView edges={['bottom', 'left', 'right']} >

                <View style={styles.userContainer} >
                    <Text style={{...styles.text, ...{fontSize: 18, marginBottom: 0}}}>Kovacs Istvan</Text>
                    {user?.email ? <Text style={{...styles.text, ...{fontSize: 10,}}}>{user.email}</Text> : null}
                    <Text style={{...styles.text, ...{fontSize: 20,}}}>AA - AA - 123</Text>
                    <Text style={{...styles.text, ...{fontSize: 20,}}}>állandó parkolóhely: A12</Text>

                </View>


                <View style={{
                    borderWidth: 3,
                    borderRadius: 20,
                    borderColor: COLORS.BLUE
                }}>

                </View>


            </SafeAreaView>


        </View>
    );
}

export default HomeScreen;


/*
{user?.isAdmin ? <Button title={'Dashboard'} onPress={()=>navigation.navigate('dashboard')}/>: null}
                <Button title={"Calendar"} onPress={()=>navigation.navigate('calendar')}/>
                <Button title={"Sign out"} onPress={()=>signOut(auth)}/>
 */

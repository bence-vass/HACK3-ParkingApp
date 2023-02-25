import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import ProfilePic from "../../assets/avatar5.png";
import {DefaultTextInput} from "../components/Inputs";
import {OrangeButton} from "../components/Buttons";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const sendData = async () => {
    console.log('send data');
    try {
        const docRef = await addDoc(collection(db, 'logs'), {
            smtn: 'hello1'
        });
        console.log("ID: ", docRef.id);
    } catch (e) {
        console.error(e);
    }
}

const HomeScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <View style={{flex: 1, backgroundColor: COLORS.BRIGHT_BLUE}}>
            <Header navigation={navigation}/>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{
                        backgroundColor: COLORS.LIGHT_BLUE,
                        alignItems: 'center',
                    }}>
                        <Image source={ProfilePic} resizeMode={'contain'} style={{
                            height: 200, width: 200, marginVertical: 30,
                        }}/>
                        <Text style={{
                            fontSize: 24,
                            color: COLORS.DARK_BLUE,
                            marginBottom: 20,
                        }}>Beállítások</Text>

                    </View>

                    <View style={{paddingTop: 20, paddingBottom: 50, paddingHorizontal: 80}}>

                        <TouchableOpacity style={{
                            backgroundColor: COLORS.BLUE,
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            marginBottom: 20
                        }} onPress={()=>navigation.navigate('set-parking-spots')}>
                            <Text style={{
                                color: COLORS.WHITE,
                                fontSize: 14,
                            }}>Parkolóház</Text>
                        </TouchableOpacity>
                        <OrangeButton title={"Szint Beállítások"} onPress={()=>navigation.navigate('set-tier-overview')}/>

                    </View>
                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

export default HomeScreen;

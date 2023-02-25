import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {OrangeButton} from "../components/Buttons";
import {DefaultTextInput} from "../components/Inputs";


const ProfilePic = require('../../assets/avatar5.png')

const ProfileScreen = ({navigation}) => {
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
                        }}>Profile</Text>

                    </View>
                    <View style={{
                        padding: 20,
                    }}>

                        <Text style={{
                            color: COLORS.DARK_BLUE,
                            fontSize: 16,
                            marginBottom: 8,
                            marginLeft: 8,
                        }}>Name</Text>
                        <DefaultTextInput value={"Kovács István"}/>
                        <Text style={{
                            color: COLORS.DARK_BLUE,
                            fontSize: 16,
                            marginBottom: 8,
                            marginLeft: 8,
                            marginTop: 16,

                        }}>Phone number</Text>
                        <DefaultTextInput value={"+36 30 5555 555"}/>
                        <Text style={{
                            color: COLORS.DARK_BLUE,
                            fontSize: 16,
                            marginBottom: 8,
                            marginLeft: 8,
                            marginTop: 16,
                        }}>E-mail address</Text>
                        <DefaultTextInput value={"kovacs.istvan@gmail.com"}/>
                    </View>
                    <View style={{paddingTop: 20, paddingBottom:50, paddingHorizontal: 80}}>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.BLUE,
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            marginBottom: 20
                        }}>
                            <Text style={{
                                color: COLORS.WHITE,
                                fontSize: 14,
                            }}>Új parkolóhely igénylése</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#737373',
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            marginBottom: 20
                        }}>
                            <Text style={{
                                color: COLORS.WHITE,
                                fontSize: 14,
                            }}>Jelszó megváltoztatása</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.BLUE,
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            marginBottom: 20
                        }}>
                            <Text style={{
                                color: COLORS.WHITE,
                                fontSize: 14,
                            }}>Profil mentése</Text>
                        </TouchableOpacity>
                        <OrangeButton title={"Sign out"} onPress={() => signOut(auth)}/>

                    </View>
                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

export default ProfileScreen;

import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";


const Leaderboard1 = require('../../assets/go.png')


const MockData = [
    {
        id: 1,
        name: 'You',
        image: Leaderboard1,
        credit: 30,
        rank: 28,
        up: true,
    },
    {
        id: 2,
        name: 'Martha Anderson',
        image: Leaderboard1,
        credit: 80,
        rank: 28,
        up: false,

    },
    {
        id: 3,
        name: 'Julia Clover',
        image: Leaderboard1,
        credit: 50,
        rank: 28,
        up: true,

    },

]


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const LeaderboardScreen = ({navigation}) => {
    const {user} = useAuthentication()
    return (
        <View style={{flex: 1, backgroundColor: COLORS.BRIGHT_BLUE}}>
            <Header navigation={navigation}/>
            <SafeAreaView>
                <ScrollView>

                    <View style={{
                        backgroundColor: COLORS.LIGHT_BLUE,
                        padding: 20,
                    }}>
                        <Text style={{
                            color: COLORS.DARK_BLUE,
                            fontSize: 24,
                        }}>Leaderboard</Text>
                    </View>

                    <View style={{
                        padding: 13,
                        //backgroundColor: 'red
                    }}>
                        <View style={{
                            backgroundColor: '#00AEEF',
                            borderRadius: 15,
                            padding: 7,
                            flexDirection: 'row'

                        }}>
                            <View style={{
                                backgroundColor: '#003767',
                                borderRadius: 15,
                                flex: 2,
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20
                            }}><Text style={{fontSize: 18, color: COLORS.WHITE}}>Daily</Text></View>
                            <View style={{
                                width: 3,
                                backgroundColor: COLORS.WHITE,
                                marginHorizontal: 20,
                                borderRadius: 5,
                                opacity: 0.3,
                            }}/>

                            <View style={{
                                borderRadius: 15,
                                flex: 2,
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20
                            }}><Text style={{fontSize: 18, color: COLORS.WHITE}}>Daily</Text></View>
                            <View style={{
                                width: 3,
                                backgroundColor: COLORS.WHITE,
                                marginHorizontal: 20,
                                borderRadius: 5,
                                opacity: 0.3,
                            }}/>

                            <View style={{
                                borderRadius: 15,
                                flex: 2,
                                alignItems: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20
                            }}><Text style={{fontSize: 18, color: COLORS.WHITE}}>Daily</Text></View>


                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 13,
                        flexDirection: 'row',
                    }}>
                        <Leader height={130} name={"Maria"} score={254}/>
                        <Leader height={150} top={true} name={"Rachel"} score={1200}/>
                        <Leader height={100} name={"Andrew"} score={100}/>


                    </View>

                    <View style={{
                        padding: 20,
                    }}>
                        <Text style={{
                            color: COLORS.DARK_BLUE,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Ranks near you</Text>
                    </View>

                    <View style={{paddingHorizontal: 20, flex: 1, marginBottom: 150}}>
                        {Object.entries(MockData).map(v => {
                            return <NearYou item={v[1]} isDark={v[0] == 0}/>
                        })}
                    </View>

                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

export default LeaderboardScreen;

const NearYou = ({item, isDark}) => {
    return (
        <View style={{
            backgroundColor: isDark ? COLORS.DARK_BLUE : COLORS.BLUE,
            borderRadius: 15,
            marginBottom: 10,
            flexDirection: 'row',
        }}>
            <Image source={item.image} style={{
                height: 50,
                width: 50,
                marginHorizontal: 15,
                marginVertical: 13,
                backgroundColor: COLORS.DARK_BLUE,
                borderRadius: 50,

            }} resizeMode={'contain'}/>
            <View style={{
                padding: 10,
                //backgroundColor: 'pink',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: COLORS.WHITE,
                    fontWeight: 'bold',
                    fontSize: 14,
                    //backgroundColor:'red'
                }}>{item.name}</Text>
                <Text style={{
                    color: COLORS.WHITE,
                    fontSize: 12,
                    //backgroundColor: 'green'
                }}>${item.credit}</Text>
            </View>
            <View>
                <View><Text>{item.up  ? ">" : "<"}</Text></View>
                <View></View>
            </View>

        </View>
    )
}


const Leader = ({height, top, name, score}) => {
    return (
        <View style={{
            flex: 1,
            marginTop: 80,
            justifyContent: 'flex-end',
        }}>
            <View style={{
                backgroundColor: top ? COLORS.ORANGE : '#8dc6e7',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                bottom: 0,
                height: height,
                width: "100%",

                alignItems: 'center',
                alignContent: 'flex-end',
            }}>
                <Image source={Leaderboard1} style={{
                    width: 50,
                    height: 50,
                    position: 'relative',
                    bottom: height / 5,
                }} resizeMode={'contain'}/>
                <Text style={{
                    color: COLORS.DARK_BLUE,
                    fontSize: 14,
                    fontWeight: 'bold',
                }}>{name}</Text>
                <Text style={{
                    color: top ? COLORS.DARK_BLUE : COLORS.ORANGE,
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>{score} DP</Text>
            </View>

        </View>
    )
}

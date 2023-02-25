import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";

const UpPic = require('../../assets/up.png')
const DownPic = require('../../assets/down.png')
const Leaderboard1 = require('../../assets/leader1.png')
const Leaderboard2 = require('../../assets/leader2.png')
const Leaderboard3 = require('../../assets/leader3.png')

const Avatar1 = require('../../assets/avatar1.png')
const Avatar2 = require('../../assets/avatar2.png')
const Avatar3 = require('../../assets/avatar3.png')
const Avatar4 = require('../../assets/avatar4.png')
const Avatar5 = require('../../assets/avatar5.png')



const MockData = [
    {
        id: 1,
        name: 'You',
        image: Avatar1,
        credit: 30,
        rank: 28,
        up: true,
    },
    {
        id: 2,
        name: 'Martha Anderson',
        image: Avatar2,
        credit: 80,
        rank: 28,
        up: false,

    },
    {
        id: 3,
        name: 'Julia Clover',
        image: Avatar3,
        credit: 50,
        rank: 28,
        up: true,

    },
    {
        id: 4,
        name: 'Martha Anderson',
        image: Avatar4,
        credit: 80,
        rank: 28,
        up: false,

    },
    {
        id: 5,
        name: 'Julia Clover',
        image: Avatar5,
        credit: 50,
        rank: 28,
        up: true,

    },
    {
        id: 6,
        name: 'Martha Anderson',
        image: Avatar3,
        credit: 80,
        rank: 28,
        up: false,

    },
    {
        id: 7,
        name: 'Julia Clover',
        image: Avatar4,
        credit: 50,
        rank: 28,
        up: true,

    },

]




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
                            }}><Text style={{fontSize: 14, color: COLORS.WHITE}}>Daily</Text></View>
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
                            }}><Text style={{fontSize: 14, color: COLORS.WHITE}}>Weekly</Text></View>
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
                            }}><Text style={{fontSize: 14, color: COLORS.WHITE}}>Monthly</Text></View>


                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 13,
                        flexDirection: 'row',
                    }}>
                        <Leader height={145} name={"Maria"} score={254} image={Leaderboard2}/>
                        <Leader height={190} top={true} name={"Rachel"} score={1200} image={Leaderboard1}/>
                        <Leader height={130} name={"Andrew"} score={100} image={Leaderboard3}/>


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
                            return <NearYou item={v[1]} isDark={v[0] == 0} key={v[1].id}/>
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
        }} key={item.id}>
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
                }}>{item.credit} DP</Text>
            </View>
            <View style={{
                //backgroundColor: 'pink',
                //alignSelf: 'flex-end',
                flex:1,
            }}>
                <View style={{
                    //backgroundColor: 'purple',
                    alignSelf: 'flex-end',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <View style={{marginRight: 15}}>{item.up ? <Image source={UpPic}/> : <Image source={DownPic}/> }</View>
                    <View style={{
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: COLORS.WHITE,
                        padding: 6,
                        marginRight: 30,
                    }}><Text style={{color: COLORS.WHITE}}>{item.rank}</Text></View>
                </View>

            </View>

        </View>
    )
}


const Leader = ({height, top, name, score ,image}) => {
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
                <Image source={image} style={{
                    width: top ? 120:  80,
                    height: top ? 110: 80,
                    position: 'relative',
                    bottom: height / 3,
                    right: top ? 5 : 0
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

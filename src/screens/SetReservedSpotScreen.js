import {
    addDoc,
    collection,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    limit,
    getCountFromServer,
    setDoc
} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {useEffect, useState} from "react";
import Header from "../components/Header";
import COLORS from "../utils/COLORS";
import {OrangeButton} from "../components/Buttons";
import {DefaultTextInput} from "../components/Inputs";

const Avatar1 = require('../../assets/avatar1.png')
const Avatar2 = require('../../assets/avatar2.png')
const Avatar3 = require('../../assets/avatar3.png')
const Avatar4 = require('../../assets/avatar4.png')
const Avatar5 = require('../../assets/avatar5.png')
const revokePic = require('../../assets/revoke.png')


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


const queryReservedSpots = query(
    collection(db, 'users'),
    where('reservedParkingSpot', '==', true)
)


const SetReservedSpotScreen = ({navigation}) => {
    //const {user} = useAuthentication()
    const [counterReserved, setCounterReserved] = useState(0)

    const [email, onChangeText] = useState("asd1@asd.com")

    const [users, setUsers] = useState([])
    const [garage, setGarage] = useState({
        available: 0
    })


    useEffect(() => {

        fetchGarage()

        fetchReservedUsers()

    }, [])

    async function fetchGarage() {
        const docSnap = await getDoc(doc(db, 'garages', 'my-garage'))
        if (docSnap.exists()) {
            let data = await docSnap.data()
            setGarage(data)
        }
    }

    const fetchReservedUsers = async () => {

        console.log('fetch user')
        const docsSnap = await getDocs(queryReservedSpots)
        let u = []
        await docsSnap.forEach(d => {
            let new_data = {id: d.id, ...d.data()}
            u = [...u, new_data]
        })
        setUsers(u)
        console.log(u)
        setCounterReserved(u.length)

        await setDoc(doc(db, 'garages', 'my-garage'),{
            reserved: u.length
        }, {merge: true})

    }


    const giveSpotByEmail = async () => {
        const q = query(
            collection(db, 'users'),
            where("email", "==", email)
        )
        const docsSnap = await getDocs(q)
        if (!docsSnap.empty) {
            await docsSnap.forEach(d => {
                setDoc(doc(db, 'users', d.id), {
                    reservedParkingSpot: true,
                }, {merge: true}).then(r => {
                    fetchReservedUsers()
                })

            })
            onChangeText('')
        } else {
            console.warn('no such user')
        }

    }


    const revokeReservedParkingSpot = async (id) => {
        console.log('revoke for', id)
        await setDoc(doc(db, 'users', id), {
            reservedParkingSpot: false,
        }, {merge: true}).then(r => {
            fetchReservedUsers()
        })

    }


    console.log('render set reser')
    return (
        <View style={{flex:1, backgroundColor: COLORS.BRIGHT_BLUE}}>
            <Header navigation={navigation}/>

            <SafeAreaView>
                <View style={{backgroundColor: COLORS.LIGHT_BLUE, padding: 20}}>
                    <Text style={{
                        color: COLORS.DARK_BLUE,
                        fontSize: 20,
                        textAlign: 'center',
                        marginBottom: 20,
                    }}>{counterReserved} parkolóhely fenntartott a {garage.available} elérhető parkolóhelyből</Text>
                    <DefaultTextInput onChange={onChangeText} value={email}/>
                    <OrangeButton title={"Parkolóhely kiadása"} onPress={giveSpotByEmail} wrapperStyle={{marginVertical: 20}}/>
                </View>
                <View style={{padding: 20}}>

                <FlatList data={users}
                          renderItem={({item}) => <User item={item} revokeFunction={revokeReservedParkingSpot}/>}
                          keyExtractor={(item, index) => 'key' + index}/>
                </View>
            </SafeAreaView>


        </View>
    );
}


export default SetReservedSpotScreen;





const User = ({item, revokeFunction}) => {
    return (
        <View style={{
            backgroundColor: COLORS.BLUE,
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
                }}>{item.email}</Text>
                <Text style={{
                    color: COLORS.WHITE,
                    fontSize: 10,
                    //backgroundColor: 'green'
                }}>ID: {item.id}</Text>
            </View>
            <View style={{
                //backgroundColor: 'pink',
                //alignSelf: 'flex-end',
                flex:1,
            }}>
                <TouchableOpacity style={{
                    //backgroundColor: 'purple',
                    alignSelf: 'flex-end',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }} onPress={()=>revokeFunction(item.id)}>
                    <View style={{marginRight: 25}}><Image source={revokePic} style={{height: 30, width:30}}/></View>

                </TouchableOpacity>

            </View>

        </View>
    )
}

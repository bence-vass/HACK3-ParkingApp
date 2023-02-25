import {orderBy, addDoc, collection, getDoc, doc, query, getDocs, getCountFromServer, setDoc} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import {useEffect, useState} from "react";
import Header from "../components/Header";
import {useIsFocused} from "@react-navigation/native";
import COLORS from "../utils/COLORS";
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


export const SetTierOverviewScreen = ({navigation}) => {
    const {user} = useAuthentication()
    const [tiers, setTiers] = useState([])

    useEffect(() => {
        async function fetchData() {
            setTiers([])
            const docsSnap = await getDocs(
                query(
                    collection(myGarageDocRef, 'tiers'), orderBy('rank')
                )
            )
            docsSnap.forEach(t => {
                let data = t.data()
                setTiers(prevTiers => [...prevTiers, data])
            })
        }

        fetchData();
    }, [])


    return (
        <View style={{flex: 1, backgroundColor: COLORS.BRIGHT_BLUE}}>
            <Header navigation={navigation}/>
            <SafeAreaView>
                <View style={{padding: 20}}>
                    <Text>Set Tier Screen</Text>
                    <FlatList data={tiers} renderItem={({item}) => <TierItem item={item}/>}
                              keyExtractor={(item, index) => 'key' + index}/>
                    <OrangeButton title={"Add Tier"} onPress={() => navigation.navigate('add-tier')}/>
                </View>
            </SafeAreaView>

        </View>
    );
}


const TierItem = ({item}) => (
    <View>
        <Text>{item.name}</Text>
        <Text>{item.price} Credit</Text>
    </View>
)


const myGarageDocRef = doc(db, 'garages', 'my-garage')

export const AddTierScreen = ({navigation}) => {
    const [tierCounter, setTierCounter] = useState(1)

    const [name, setName] = useState('Gold Tier')
    const [desc, setDesc] = useState('you cool')
    const [price, setPrice] = useState('1')
    const isFocused = useIsFocused()

    async function fetchData() {
        const tiersSnap = await getCountFromServer(
            collection(myGarageDocRef, 'tiers')
        )
        let count = tiersSnap.data().count
        setTierCounter(count + 1)

    }


    useEffect(() => {
        fetchData()
    }, [isFocused])

    const addTier = async () => {
        try {
            await setDoc(doc(myGarageDocRef, 'tiers', 'tier-' + tierCounter), {
                name: name,
                desc: desc,
                default_price: +price,
                current_price: +price,
                price_last_30_days: Array(30).fill(+price),
                rank: tierCounter,
            }, {merge: false})
            navigation.navigate('set-tier-overview')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.BRIGHT_BLUE}}>
            <Header navigation={navigation}/>
            <SafeAreaView>
                <Text>ADD Tier Screen (Tier:{tierCounter})</Text>
                <Text>Name</Text>
                <TextInput onChangeText={setName} value={name} style={styles.input}/>

                <Text>Description</Text>
                <TextInput onChangeText={setDesc} value={desc} style={styles.input}/>

                <Text>Price</Text>
                <TextInput onChangeText={setPrice} value={price} style={styles.input} keyboardType={'numeric'}
                           numeric={true}/>

                <Button title={"add tier"} onPress={addTier}/>
            </SafeAreaView>

        </View>
    )
}


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
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {useEffect, useState} from "react";


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


const SetReservedSpotScreen = () => {
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
        <View style={styles.container}>
            <Text>{counterReserved} out of {garage.available} available spots are reserved</Text>
            <TextInput onChangeText={onChangeText} value={email} style={styles.input}/>
            <Button title={"give user a spot"} onPress={giveSpotByEmail}/>
            <FlatList data={users}
                      renderItem={({item}) => <ListItem item={item} revokeFunction={revokeReservedParkingSpot}/>}
                      keyExtractor={(item, index) => 'key' + index}/>
        </View>
    );
}

const ListItem = ({item, revokeFunction}) => (
    <View>
        <Text>{item.email}</Text>
        <Button title={"revoke"} onPress={() => revokeFunction(item.id)}/>
    </View>
)

export default SetReservedSpotScreen;






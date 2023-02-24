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


const queryReservedSpots = query(
    collection(db, 'users'),
    where('reservedParkingSpot', '==', true)
)

const setFirestoreCountReservedSpots = () => {
    getCountFromServer(queryReservedSpots).then((d) => {
        const count = d.data().count
        setDoc(doc(db, 'garages', 'my-garage'), {
            reserved: count,
        }, {merge: true}).then(d => {
            console.log(d)
        })

    })
}


const SetReservedSpotScreen = () => {
    //const {user} = useAuthentication()

    const [email, onChangeText] = useState("asd1@asd.com")

    const [users, setUsers] = useState([])
    const [garage, setGarage] = useState({
        available: 0
    })

    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(doc(db, 'garages', 'my-garage'))
            if (docSnap.exists()) {
                let data = await docSnap.data()
                setGarage(data)
            }
        }

        fetchReservedUsers()
        fetchData()

    }, [])


    const fetchReservedUsers = async () => {
        setUsers([])

        const docsSnap = await getDocs(queryReservedSpots)
        if (!docsSnap.empty) {
            await docsSnap.forEach(d => {
                let new_data = {id: d.id, ...d.data()}
                console.log(new_data)
                setUsers(prevUser => [...prevUser, new_data])
                //console.log(users)
            })
        } else {
            console.log('no res')
        }
    }


    const giveSpotByEmail = async () => {
        const q = query(
            collection(db, 'users'),
            where("email", "==", email)
        )
        const docsSnap = await getDocs(q)
        if (!docsSnap.empty) {
            docsSnap.forEach(d => {
                setDoc(doc(db, 'users', d.id), {
                    reservedParkingSpot: true,
                }, {merge: true})

                setFirestoreCountReservedSpots()
            })
            onChangeText('')
        } else {
            console.warn('no such user')
        }

    }
    console.log('render set reser')
    return (
        <View style={styles.container}>
            <Text>{users?.length ? users.length : 0} out of {garage.available} available spots are reserved</Text>
            <TextInput onChangeText={onChangeText} value={email} style={styles.input}/>
            <Button title={"give user a spot"} onPress={giveSpotByEmail}/>
            <FlatList data={users} renderItem={({item}) => <ListItem item={item}/>}
                      keyExtractor={(item, index) => 'key' + index}/>
        </View>
    );
}

export default SetReservedSpotScreen;


const revokeReservedParkingSpot = async (id) => {
    console.log('revoke for', id)
    await setDoc(doc(db, 'users', id), {
        reservedParkingSpot: false,
    }, {merge: true})

    setFirestoreCountReservedSpots()
}

const ListItem = ({item}) => (
    <View>
        <Text>{item.email}</Text>
        <Button title={"revoke"} onPress={() => revokeReservedParkingSpot(item.id)}/>
    </View>
)

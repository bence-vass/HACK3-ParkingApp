import {
    updateDoc,
    arrayUnion,
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc, addDoc
} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";
import {Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import {getAuth, signOut} from "firebase/auth";
import {Calendar, CalendarUtils, LocaleConfig} from "react-native-calendars";
import {forwardRef, useCallback, useEffect, useRef, useState} from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Arrow = ({direction}) => {
    const text = direction === 'left' ? '<<' : '>>';
    return (
        <Text>{text}</Text>
    );
}


const CalendarScreen = ({navigation}) => {
    const TODAY = new Date()
    const deltaDAYS = 14
    const {user} = useAuthentication()
    const [beginDate, setBeginDate] = useState()
   /* const [selectedDates, setSelectedDates] = useState({
        "2023-02-24": {
            "color": "blue",
            "endingDay": false,
            "startingDay": true
        }, "2023-02-25": {"color": "blue", "endingDay": true, "startingDay": false}
    })*/

    const [selectedDates, setSelectedDates] = useState({})
    const [reservationsDates, setReservationsDates] = useState({})

    const [tiers, setTiers] = useState([])
    const [selectedTier, setSelectedTier] = useState()
    const myGarageDocRef = doc(db, 'garages', 'my-garage')

    const [modalVisibility, setModalVisibility] = useState(false)


    async function fetchData() {
        const tiersSnap = await getDocs(
            query(
                collection(myGarageDocRef, 'tiers'), orderBy('rank')
            )
        )
        let t = []
        tiersSnap.forEach(d => {
            let new_data = {...d.data(), id: d.id}
            t = [...t, new_data]
        })
        setTiers(t)

    }

    useEffect(() => {
        fetchData()
        fetchUserReservations()
    }, [user])


    const buySpot = async () => {
        if (user?.uid) {
            const resRef = collection(doc(db, 'users', user?.uid), 'reservations')

            await Object.entries(selectedDates).forEach((v, k) => {
                let md = v
                md[1].color = 'green'
                addDoc(resRef, {
                    markedDate: md,
                    date: v[0],
                    tier: selectedTier,
                })

            })


        }

    }

    const fetchUserReservations = async () => {
        if (user?.uid) {
            const resRef = collection(doc(db, 'users', user?.uid), 'reservations')
            const resSnap = await getDocs(query(resRef, orderBy('date')))
            let md = {}
            resSnap.forEach(d => {
                let new_data = d.data()
                let new_md = {[new_data.markedDate[0]]: new_data.markedDate[1]}
                md = {...md, ...new_md}
            })
            setReservationsDates(md)
        }


    }
    console.log(tiers)
    return (
        <View>


            <Modal visible={modalVisibility}>
                <SafeAreaView>
                    <Text>Are you sure?</Text>

                    <Button title={'nope'} onPress={() => {
                        setSelectedTier()
                        setModalVisibility(false)
                    }}/>
                    <Button title={"yes"} onPress={async () => {
                        //console.log(selectedTier, selectedDates,)
                        await buySpot()

                        navigation.navigate('home')
                        setModalVisibility(false)
                    }}/>
                </SafeAreaView>
            </Modal>


            <Calendar
                markingType={'period'}
                markedDates={{

                    ...{},
                    ...reservationsDates,
                    ...selectedDates,
                }}
                minDate={CalendarUtils.getCalendarDateString(TODAY)}
                maxDate={CalendarUtils.getCalendarDateString(new Date(TODAY.getTime() + (deltaDAYS * 86400000)))}
                onDayPress={day => {
                    if (beginDate) {

                        let later_day = beginDate
                        let sooner_day = day
                        if (beginDate.day > sooner_day.day) {
                            later_day = day
                            sooner_day = beginDate
                        }

                        console.log('later', later_day.day)
                        console.log('sooner', sooner_day.day)

                        let dates = {}
                        for (let i = later_day.day; i <= sooner_day.day; i++) {
                            dates = {
                                ...dates,
                                [day.year + "-" + ("00" + day.month).slice(-2) + "-" + ("00" + i).slice(-2)]: {
                                    startingDay: i === later_day.day,
                                    endingDay: i === sooner_day.day,
                                    color: "blue"
                                },
                            }
                        }

                        setBeginDate()
                        setSelectedDates(dates)

                    } else {
                        setSelectedDates({[day.dateString]: {startingDay: true, endingDay: true, color: "blue"}})
                    }
                }}
                onDayLongPress={day => {
                    setBeginDate(day)
                    setSelectedDates({[day.dateString]: {startingDay: true, endingDay: true, color: "lightblue"}})
                }}
                monthFormat={'yyyy MMM'}
                onMonthChange={month => {
                    console.log('month changed', month);
                    setBeginDate()
                    setSelectedDates({})
                }}
                renderArrow={direction => <Arrow direction={direction}/>}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
            />

            <View>

                <Text>Select Tier</Text>
                {tiers && tiers.length !== 0 ? tiers.map((v, i) => {
                    //console.log(i, v)
                    return (
                        <View key={v.id}>
                            <Text>{v.name} / {v.id}</Text>
                            <Text>Current Price {v.current_price}</Text>
                            <Button title={'select'} onPress={() => {
                                setSelectedTier(v.id)
                                setModalVisibility(true)
                            }}/>
                        </View>
                    )

                }) : <Text>Loading</Text>}
            </View>

        </View>
    );
}

export default CalendarScreen;

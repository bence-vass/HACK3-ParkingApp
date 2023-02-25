import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useFonts } from 'expo-font';

import {NavigationContainer} from "@react-navigation/native"
import {doc, getDoc} from "firebase/firestore";
import {db} from "./firebaseConfig";

import {useAuthentication} from "./src/utils/hooks/useAuthentication";


import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LandingScreen from "./src/screens/LandingScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import SetParkingSpotScreen from "./src/screens/SetParkingSpotScreen";
import SetReservedSpotScreen from "./src/screens/SetReservedSpotScreen";
import {SetTierOverviewScreen, AddTierScreen} from "./src/screens/SetTierScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const AuthStackNav = createNativeStackNavigator();

const UserStack = ({isAdmin}) => {

    return (
        <>
            <AuthStackNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <AuthStackNav.Screen name={'home'} component={HomeScreen}/>
                <AuthStackNav.Screen name={'calendar'} component={CalendarScreen}/>

                {isAdmin ? <>

                    <AuthStackNav.Screen name={'dashboard'} component={DashboardScreen}/>
                    <AuthStackNav.Screen name={'set-parking-spots'} component={SetParkingSpotScreen}/>
                    <AuthStackNav.Screen name={'set-reserved-spots'} component={SetReservedSpotScreen}/>
                    <AuthStackNav.Screen name={'set-tier-overview'} component={SetTierOverviewScreen}/>
                    <AuthStackNav.Screen name={'add-tier'} component={AddTierScreen}/>
                </> : null}

            </AuthStackNav.Navigator>
        </>
    )
}


const DrawerNav = createDrawerNavigator()
const UserDrawer = ({isAdmin}) => {
    return (<>
            <DrawerNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <DrawerNav.Screen name={'home'} title={'Home'} component={HomeScreen}/>
                <DrawerNav.Screen name={'calendar'} component={CalendarScreen}/>
                <DrawerNav.Screen name={'profile'} component={ProfileScreen}/>

                {isAdmin ? <>

                    <DrawerNav.Screen name={'dashboard'} component={DashboardScreen}/>
                    <DrawerNav.Screen name={'set-parking-spots'} component={SetParkingSpotScreen}/>
                    <DrawerNav.Screen name={'set-reserved-spots'} component={SetReservedSpotScreen}/>
                    <DrawerNav.Screen name={'set-tier-overview'} component={SetTierOverviewScreen}/>
                    <DrawerNav.Screen name={'add-tier'} component={AddTierScreen}/>
                </> : null}


            </DrawerNav.Navigator>

        </>
    )
}


const UserStackNav = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <>
            <UserStackNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <UserStackNav.Screen name={'landing'} component={LandingScreen}/>
                <UserStackNav.Screen name={'login'} component={LoginScreen}/>
                <UserStackNav.Screen name={'sign-up'} component={SignupScreen}/>

            </UserStackNav.Navigator>
        </>
    )
}

export default function App() {
    const [fontsLoaded] = useFonts({
        'Helvetica Neue LT': require('./assets/fonts/HelveticaNeueLTProMd.otf')
    })
    const {user} = useAuthentication()
    console.log(user?.isAdmin)
    if(fontsLoaded){
        return (
            <NavigationContainer>
                {user ? <UserDrawer isAdmin={user?.isAdmin}/> : <AuthStack/>}
            </NavigationContainer>
        )
    }

}

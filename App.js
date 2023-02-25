import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
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
import LeaderboardScreen from "./src/screens/LeaderboardScreen";

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
                <DrawerNav.Screen name={'home'}
                                  options={{
                                      drawerLabel: 'Főoldal',
                                  }}
                                  component={HomeScreen}/>
                <DrawerNav.Screen name={'calendar'}
                                  options={{
                                      drawerLabel: 'Naptár',
                                  }}
                                  component={CalendarScreen}/>
                <DrawerNav.Screen name={'profile'}
                                  options={{
                                      drawerLabel: 'Profil',
                                  }}
                                  component={ProfileScreen}/>
                <DrawerNav.Screen name={'leaderboard'}
                                  options={{
                                      drawerLabel: 'Ranglista',
                                  }}
                                  component={LeaderboardScreen}/>

                {isAdmin ? <>

                    <DrawerNav.Screen name={'dashboard'}
                                      options={{
                                          drawerLabel: 'Beállítások',
                                      }}
                                      component={DashboardScreen}/>
                    <DrawerNav.Screen name={'set-parking-spots'}
                                      options={{
                                          drawerLabel: 'Parkolóház',
                                      }}
                                      component={SetParkingSpotScreen}/>
                    <DrawerNav.Screen name={'set-reserved-spots'}
                                      options={{
                                          drawerLabel: 'Fenntartott Parkolóhelyek',
                                      }}
                                      component={SetReservedSpotScreen}/>
                    <DrawerNav.Screen name={'set-tier-overview'}
                                      options={{
                                          drawerLabel: 'Szint Beállítások',
                                      }}
                                      component={SetTierOverviewScreen}/>
                    <DrawerNav.Screen name={'add-tier'}
                                      options={{
                                          drawerLabel: 'Új Szint Létrehozása',
                                      }}
                                      component={AddTierScreen}/>
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
                <UserStackNav.Screen name={'login'} component={LoginScreen}/>

                <UserStackNav.Screen name={'landing'} component={LandingScreen}/>
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

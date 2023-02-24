import {createNativeStackNavigator} from "@react-navigation/native-stack";
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

const AuthStackNav = createNativeStackNavigator();

const UserStack = ({isAdmin}) => {

    return (
        <NavigationContainer>
            <AuthStackNav.Navigator>
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
        </NavigationContainer>
    )
}

const UserStackNav = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <UserStackNav.Navigator>
                <UserStackNav.Screen name={'landing'} component={LandingScreen}/>
                <UserStackNav.Screen name={'login'} component={LoginScreen}/>
                <UserStackNav.Screen name={'sign-up'} component={SignupScreen}/>

                {/* Admin Pages */}

                <UserStackNav.Screen name={"dashboard"} component={DashboardScreen}/>

            </UserStackNav.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    const {user} = useAuthentication()
    console.log(user?.isAdmin)
    return user ? <UserStack isAdmin={user?.isAdmin}/> : <AuthStack/>
}

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyDdZWJbH3MS4Vtg5tAlIUzQd32oFwkqVyY",
    authDomain: "hack3-hack.firebaseapp.com",
    projectId: "hack3-hack",
    storageBucket: "hack3-hack.appspot.com",
    messagingSenderId: "916395317904",
    appId: "1:916395317904:web:d0675d134dcca8043c5615"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})


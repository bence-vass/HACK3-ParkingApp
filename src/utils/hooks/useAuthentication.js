import {onAuthStateChanged} from 'firebase/auth'
import {useEffect, useState} from "react";
import {auth, db} from "../../../firebaseConfig";
import {doc, getDoc} from "firebase/firestore";


export function useAuthentication() {
    const [user, setUser] = useState()

    useEffect(() => {
        return onAuthStateChanged(auth, async (u) => {
            if (await u) {

                const docSnap = await getDoc(doc(db, 'users', u.uid))
                if (docSnap.exists()) {
                    let data = await docSnap.data()
                    setUser({...u, isAdmin: !!data?.admin})
                } else {
                    console.error("No such user")
                }

                //setUser(undefined)
            } else {
                setUser(undefined)
            }
        })
    }, [])

    return {user}
}

import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    const unsubscribe = firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data());
        });

    return () => unsubscribe();
    }, []);

    return userData;
};

export default useUserData;

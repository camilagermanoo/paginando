import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgFG8WvQk8BxUAGxO1ouI9-lt8CXHFAJ0",
    authDomain: "paginando-6f542.firebaseapp.com",
    projectId: "paginando-6f542",
    storageBucket: "paginando-6f542.appspot.com",
    messagingSenderId: "1036165715498",
    appId: "1:1036165715498:web:77762c309aa430a3011553",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
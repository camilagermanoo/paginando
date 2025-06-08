// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // <- VOCÊ ESQUECEU ISSO!
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCgFG8WvQk8BxUAGxO1ouI9-lt8CXHFAJ0",
  authDomain: "paginando-6f542.firebaseapp.com",
  projectId: "paginando-6f542",
  storageBucket: "paginando-6f542.appspot.com",
  messagingSenderId: "1036165715498",
  appId: "1:1036165715498:web:77762c309aa430a3011553",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app); 

export { auth, db }; 

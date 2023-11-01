// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider, getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZdSUyxc15_XxhoIkZ8bGZhh6J-7nZBKc",
    authDomain: "whatsapp2-63ae2.firebaseapp.com",
    projectId: "whatsapp2-63ae2",
    storageBucket: "whatsapp2-63ae2.appspot.com",
    messagingSenderId: "835799369799",
    appId: "1:835799369799:web:ed217624f4b6903bf74962"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {db, auth, provider};
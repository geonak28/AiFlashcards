// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyByd8MboyFhazWn2ttN3pfvAMnogDanfh4",
    authDomain: "flashcards-2fc7a.firebaseapp.com",
    projectId: "flashcards-2fc7a",
    storageBucket: "flashcards-2fc7a.appspot.com",
    messagingSenderId: "659091589935",
    appId: "1:659091589935:web:7604361179b83e6caaafda",
    measurementId: "G-45SCG58K7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


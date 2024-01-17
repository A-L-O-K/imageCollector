import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyC0WtdiCRHpXPQ0JeMV6xYy3B4pcMV3AoQ",
    authDomain: "crowd-sourcer.firebaseapp.com",
    projectId: "crowd-sourcer",
    storageBucket: "crowd-sourcer.appspot.com",
    messagingSenderId: "822920257061",
    appId: "1:822920257061:web:d0d24979ae0a91021429cc",
    measurementId: "G-ZBYN6VXG44"
}



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}



export { firebase };
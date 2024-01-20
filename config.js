import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDg6fc70n93Jv0dG8H-BbbNSYFdb4pP6zA",
    authDomain: "ceo-complete-each-other.firebaseapp.com",
    projectId: "ceo-complete-each-other",
    storageBucket: "ceo-complete-each-other.appspot.com",
    messagingSenderId: "926419851454",
    appId: "1:926419851454:web:182e08c1d9b7315790e6ef",
    measurementId: "G-CYMK2YEYKQ"
  };



if (!firebase.apps.length) {
    const app=firebase.initializeApp(firebaseConfig);
    
}

// export const firestore = firebase.firestore();

export { firebase };
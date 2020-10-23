import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8lrwlVP3ZsRN2ZpnkAB6CDkRRvBkTuTI",
    authDomain: "lab-1-597d1.firebaseapp.com",
    databaseURL: "https://lab-1-597d1.firebaseio.com",
    projectId: "lab-1-597d1",
    storageBucket: "lab-1-597d1.appspot.com",
    messagingSenderId: "61959884958",
    appId: "1:61959884958:web:29ecfaee69e7ac8f206b8f"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
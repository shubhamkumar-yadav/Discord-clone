import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC2qD-Prwxk8jpm8Yng8IMI031HMyLyPKI",
    authDomain: "discord-clone-94d4c.firebaseapp.com",
    projectId: "discord-clone-94d4c",
    storageBucket: "discord-clone-94d4c.appspot.com",
    messagingSenderId: "125411430178",
    appId: "1:125411430178:web:b86c9fef8ab71238079f7b",
    measurementId: "G-8TQQ0C2QZE"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider,db};
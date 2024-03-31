// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// firebase 9
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
// firebase 9

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
export const timestamp = serverTimestamp()

export default { auth, googleProvider, db, storage, timestamp }
// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();
// const auth = firebase.auth();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// export { firestore, auth, timestamp };

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: 'AIzaSyBaq48w02ecze6DpsbIRJiCwHVbyrbBpNI',
//     authDomain: 'invoice-app-vue-92380.firebaseapp.com',
//     projectId: 'invoice-app-vue-92380',
//     storageBucket: 'invoice-app-vue-92380.appspot.com',
//     messagingSenderId: '374167991170',
//     appId: '1:374167991170:web:1b75a4cf82cf7b1ac3559b',
// }

// const firebaseApp = initializeApp(firebaseConfig)
// const db = getFirestore(firebaseApp)
// export default db

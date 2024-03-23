import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: 'AIzaSyBaq48w02ecze6DpsbIRJiCwHVbyrbBpNI',
    authDomain: 'invoice-app-vue-92380.firebaseapp.com',
    projectId: 'invoice-app-vue-92380',
    storageBucket: 'invoice-app-vue-92380.appspot.com',
    messagingSenderId: '374167991170',
    appId: '1:374167991170:web:1b75a4cf82cf7b1ac3559b',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export default db

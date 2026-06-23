
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "scaradesk.firebaseapp.com",
  projectId: "scaradesk",
  storageBucket: "scaradesk.firebasestorage.app",
  messagingSenderId: "703549809572",
  appId: "1:703549809572:web:b0953bcc4d0f03eee91731",
 
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth,provider}
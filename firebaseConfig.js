
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4drYAYEMYL_saCzBJpmgGOkqniE6DuYk",
  authDomain: "reportesciudadanos-27091.firebaseapp.com",
  projectId: "reportesciudadanos-27091",
  storageBucket: "reportesciudadanos-27091.firebasestorage.app",
  messagingSenderId: "855274329346",
  appId: "1:855274329346:web:cdab2883d1baabab455e1b",
  measurementId: "G-HG2ZWKKVR0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
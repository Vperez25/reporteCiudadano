import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// 🔹 Inicializar app (bien)
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// ✅ AUTH CORRECTO PARA REACT NATIVE
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// 🔹 Firestore
const db = getFirestore(app);

export { auth, db };
export default app;

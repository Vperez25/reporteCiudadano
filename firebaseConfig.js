import { Alert } from 'react-native';

Alert.alert('Test 1', 'Inicio de archivo');
import { initializeApp, getApps } from 'firebase/app';
Alert.alert('Test 2', 'Imports de firebase OK');
import { getAuth } from 'firebase/auth';
Alert.alert('Test 3', 'getAuth importado');
import { getFirestore } from 'firebase/firestore';
Alert.alert('Test 4', 'getFirestore importado');

const firebaseConfig = {
  apiKey: "AIzaSyD4drYAYEMYL_saCzBJpmgGOkqniE6DuYk",
  authDomain: "reportesciudadanos-27091.firebaseapp.com",
  projectId: "reportesciudadanos-27091",
  storageBucket: "reportesciudadanos-27091.firebasestorage.app",
  messagingSenderId: "855274329346",
  appId: "1:855274329346:web:cdab2883d1baabab455e1b",
  measurementId: "G-HG2ZWKKVR0"
};
Alert.alert('2', 'Config definido');

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
Alert.alert('3', 'App inicializada: ' + app.name);

const auth = getAuth(app);
Alert.alert('4', 'Auth creado: ' + (auth ? 'SI' : 'NO'));

const db = getFirestore(app);
Alert.alert('5', 'DB creada: ' + (db ? 'SI' : 'NO'));
export { auth, db };
export default app;

Alert.alert('6', 'Exports completados');
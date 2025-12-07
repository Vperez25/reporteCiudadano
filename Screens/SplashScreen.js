import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

console.log('🔍 DEBUG en SplashScreen:');
console.log('auth:', auth);
console.log('auth type:', typeof auth);
console.log('auth keys:', auth ? Object.keys(auth) : 'undefined');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          // Usuario autenticado -> ir al feed
          navigation.replace('Main');
        } else {
          // No autenticado -> ir a login
          navigation.replace('Login');
        }
      }, 2000); // Mostrar splash por 2 segundos
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="megaphone" size={100} color="#1A72DD" />
      <Text style={styles.title}>Reportes Ciudadanos</Text>
      <Text style={styles.subtitle}>Tu voz importa</Text>
      
      <ActivityIndicator 
        size="large" 
        color="#1A72DD" 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A72DD',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  loader: {
    marginTop: 40,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      
      if (user) {
        // Intentar obtener datos de Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Si no hay documento en Firestore, usar datos de Auth
          setUserData({
            name: user.displayName || 'Usuario',
            email: user.email,
            uid: user.uid,
            createdAt: user.metadata.creationTime,
          });
        }
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A72DD" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  const user = auth.currentUser;

  return (
    <ScrollView style={styles.container}>
      {/* Header con ícono de perfil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#1A72DD" />
        </View>
        <Text style={styles.name}>{userData?.name || user?.displayName || 'Usuario'}</Text>
        <Text style={styles.email}>{userData?.email || user?.email}</Text>
      </View>

      {/* Información del perfil */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Correo Electrónico</Text>
            <Text style={styles.infoValue}>{userData?.email || user?.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Nombre Completo</Text>
            <Text style={styles.infoValue}>{userData?.name || user?.displayName || 'No configurado'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="fingerprint-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>ID de Usuario</Text>
            <Text style={styles.infoValue}>{user?.uid.substring(0, 20)}...</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Miembro desde</Text>
            <Text style={styles.infoValue}>
              {userData?.createdAt 
                ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : new Date(user?.metadata.creationTime).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
              }
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email Verificado</Text>
            <Text style={styles.infoValue}>
              {user?.emailVerified ? 'Sí ✅' : 'No ⚠️'}
            </Text>
          </View>
        </View>
      </View>

      {/* Estadísticas (placeholder) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="document-text-outline" size={30} color="#1A72DD" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reportes</Text>
          </View>

          <View style={styles.statBox}>
            <Ionicons name="heart-outline" size={30} color="#FF3B30" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Me gusta</Text>
          </View>

          <View style={styles.statBox}>
            <Ionicons name="chatbubble-outline" size={30} color="#26BD28" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Comentarios</Text>
          </View>
        </View>
      </View>

      {/* Botón volver */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver a Configuración</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  backButton: {
    backgroundColor: '#1A72DD',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Cargar datos del usuario
  useEffect(() => {
    loadUserData();
    loadSettings();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    } catch (error) {
      console.error('Error cargando datos de usuario:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem('notificationsEnabled');
      const darkMode = await AsyncStorage.getItem('darkModeEnabled');
      
      if (notifications !== null) {
        setNotificationsEnabled(JSON.parse(notifications));
      }
      if (darkMode !== null) {
        setDarkModeEnabled(JSON.parse(darkMode));
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    }
  };

  const saveNotificationsSetting = async (value) => {
    setNotificationsEnabled(value);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(value));
  };

  const saveDarkModeSetting = async (value) => {
    setDarkModeEnabled(value);
    await AsyncStorage.setItem('darkModeEnabled', JSON.stringify(value));
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              console.log('Sesión cerrada');
            } catch (error) {
              console.error('Error cerrando sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sección de Perfil */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="person-circle-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Mi Perfil</Text>
              <Text style={styles.optionSubtitle}>
                {userData?.name || 'Cargando...'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option}
          onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="create-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Editar Perfil</Text>
              <Text style={styles.optionSubtitle}>Cambiar nombre y foto</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Sección de Aplicación */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aplicación</Text>
        
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Notificaciones</Text>
              <Text style={styles.optionSubtitle}>Recibir alertas de nuevos reportes</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={saveNotificationsSetting}
            trackColor={{ false: '#ccc', true: '#1A72DD' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="moon-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Modo Oscuro</Text>
              <Text style={styles.optionSubtitle}>Tema oscuro para la app</Text>
            </View>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={saveDarkModeSetting}
            trackColor={{ false: '#ccc', true: '#1A72DD' }}
            thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity 
          style={styles.option}
          onPress={() => Alert.alert('Versión', 'Reportes Ciudadanos v1.0.0')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="information-circle-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Acerca de</Text>
              <Text style={styles.optionSubtitle}>Versión 1.0.0</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Sección de Cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        
        <TouchableOpacity 
          style={styles.option}
          onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="key-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Cambiar Contraseña</Text>
              <Text style={styles.optionSubtitle}>Actualizar tu contraseña</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option}
          onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#1A72DD" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Privacidad</Text>
              <Text style={styles.optionSubtitle}>Gestionar tu privacidad</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, styles.logoutOption]}
          onPress={handleLogout}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, styles.logoutText]}>Cerrar Sesión</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Reportes Ciudadanos © 2024
        </Text>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    marginLeft: 15,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  logoutOption: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

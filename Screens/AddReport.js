import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useReports } from '../context/ReportsContext';

export default function AddReport({ navigation }) {
  const { addReport } = useReports();
  
  // Estados para manejar la información del reporte
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Función para obtener la ubicación
  const getLocation = async () => {
    try {
      setLoadingLocation(true);
      
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu ubicación para crear el reporte.',
          [{ text: 'OK' }]
        );
        setLoadingLocation(false);
        return;
      }

      
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      
      const [address] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const locationString = address 
        ? `${address.street || ''} ${address.city || ''}, ${address.region || ''}`.trim()
        : `${currentLocation.coords.latitude.toFixed(4)}, ${currentLocation.coords.longitude.toFixed(4)}`;

      setLocation({
        coords: currentLocation.coords,
        address: locationString,
      });

      Alert.alert('Ubicación obtenida', locationString);
      setLoadingLocation(false);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación. Intenta de nuevo.');
      setLoadingLocation(false);
    }
  };

  // Función para tomar una foto con la cámara
  const takePhoto = async () => {
    try {
      
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu cámara para tomar la foto del reporte.',
          [{ text: 'OK' }]
        );
        return;
      }

      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        Alert.alert('Foto capturada', 'La imagen se ha agregado correctamente');
      }
    } catch (error) {
      console.error('Error tomando foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
    }
  };

  // Función para enviar el reporte
  const sendReport = () => {
    // Validaciones
    if (!location) {
      Alert.alert('Ubicación requerida', 'Por favor activa la ubicación antes de enviar el reporte.');
      return;
    }

    if (!image) {
      Alert.alert('Imagen requerida', 'Por favor toma una foto antes de enviar el reporte.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Descripción requerida', 'Por favor agrega una descripción del problema.');
      return;
    }

    // Crear el objeto del reporte
    const newReport = {
      location: location.address,
      coords: location.coords,
      image: image,
      description: description.trim(),
    };

    // Agregar el reporte al contexto
    addReport(newReport);

    // Mostrar mensaje de éxito
    Alert.alert(
      'Reporte enviado',
      'Tu reporte se ha enviado correctamente',
      [
        {
          text: 'OK',
          onPress: () => {
            // Limpiar el formulario
            setLocation(null);
            setImage(null);
            setDescription('');
            // Navegar de regreso al feed
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Sección de Ubicación */}
      <View style={styles.row}>
        <Ionicons name="location-outline" size={24} color="#555" />
        <View style={styles.rowText}>
          <Text style={styles.label}>Ubicación</Text>
          {location ? (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{location.address}</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.button, loadingLocation && styles.buttonDisabled]} 
              onPress={getLocation}
              disabled={loadingLocation}
            >
              <Text style={styles.buttonText}>
                {loadingLocation ? 'Obteniendo ubicación...' : 'Activar ubicación'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sección de Imagen */}
      <View style={styles.row}>
        <Ionicons name="camera-outline" size={24} color="#555" />
        <View style={styles.rowText}>
          <Text style={styles.label}>Imagen</Text>
          {image ? (
            <View>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity 
                style={[styles.button, { marginTop: 10 }]} 
                onPress={takePhoto}
              >
                <Text style={styles.buttonText}>Tomar otra foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Toca para agregar imagen</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sección de Descripción */}
      <View style={styles.row}>
        <Ionicons name="document-text-outline" size={24} color="#555" />
        <View style={styles.rowText}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder="Describe el problema que quieres reportar" 
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Botón de Enviar */}
      <TouchableOpacity style={styles.sendButton} onPress={sendReport}>
        <Text style={styles.sendButtonText}>Enviar reporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f2f2f2' 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 20 
  },
  rowText: { 
    marginLeft: 10, 
    flex: 1 
  },
  label: { 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  button: { 
    backgroundColor: '#007bff', 
    padding: 8, 
    borderRadius: 5 
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: { 
    color: '#fff',
    textAlign: 'center',
  },
  textInput: { 
    backgroundColor: '#fff', 
    borderRadius: 5, 
    padding: 10, 
    minHeight: 60 
  },
  sendButton: { 
    backgroundColor: 'green', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  sendButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  infoBox: {
    backgroundColor: '#e7f3ff',
    padding: 10,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
  },
  infoText: {
    color: '#333',
    fontSize: 14,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

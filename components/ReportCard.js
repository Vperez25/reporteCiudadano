import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReportCard({ user, location, time, description, image, coords }) {
  return (
    <View style={styles.card}>
      {/* Información del usuario */}
      <View style={styles.userInfo}>
        <View style={styles.profileIcon}>
          <Ionicons name="person-circle-outline" size={40} color="#555" />
        </View>

        <View style={styles.userText}>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.userLocation}>{location}</Text>
        </View>

        <Text style={styles.timeText}>{time}</Text>
      </View>

      {/* Imagen del reporte */}
      {image ? (
        <Image 
          source={{ uri: image }} 
          style={styles.reportImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="camera-outline" size={50} color="#999" />
          <Text style={styles.imageText}>Imagen del reporte</Text>
        </View>
      )}

      {/* Descripción */}
      <Text style={styles.description}>{description}</Text>

      {/* Coordenadas (opcional, para debugging) */}
      {coords && (
        <Text style={styles.coordsText}>
          📍 {coords.latitude.toFixed(6)}, {coords.longitude.toFixed(6)}
        </Text>
      )}

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#333" />
          <Text style={styles.actionText}>Me gusta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#333" />
          <Text style={styles.actionText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#333" />
          <Text style={styles.actionText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userLocation: {
    color: 'gray',
    fontSize: 12,
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
  },
  reportImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageText: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  coordsText: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 13,
  },
});

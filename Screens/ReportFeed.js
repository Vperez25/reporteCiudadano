import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ReportCard from '../components/ReportCard';
import { useReports } from '../context/ReportsContext';

export default function ReportFeed() {
  const { reports } = useReports();

  return (
    <View style={styles.container}>
      <ScrollView>
        {reports.length === 0 ? (
          // Mensaje cuando no hay reportes
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay reportes aún</Text>
            <Text style={styles.emptySubtext}>
              Presiona el botón "+ Agregar" para crear tu primer reporte
            </Text>
          </View>
        ) : (
          // Mostrar todos los reportes
          reports.map((report) => (
            <ReportCard
              key={report.id}
              user={report.user}
              location={report.location}
              time={report.time}
              description={report.description}
              image={report.image}
              coords={report.coords}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f2', 
    paddingTop: 10 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

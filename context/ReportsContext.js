import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ReportsContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports debe usarse dentro de un ReportsProvider');
  }
  return context;
};

// Provider del contexto
export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  // Función para agregar un nuevo reporte
  const addReport = (newReport) => {
    const reportWithId = {
      ...newReport,
      id: Date.now().toString(), // ID único basado en timestamp
      time: 'hace un momento',
      user: 'Usuario Actual', // Puedes personalizarlo
    };
    setReports((prevReports) => [reportWithId, ...prevReports]);
  };

  // Función para eliminar un reporte (opcional)
  const deleteReport = (reportId) => {
    setReports((prevReports) => prevReports.filter(report => report.id !== reportId));
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, deleteReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

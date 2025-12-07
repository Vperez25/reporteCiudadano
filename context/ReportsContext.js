import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ReportsContext = createContext();

export const useReports = () => useContext(ReportsContext);

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  // ✅ ESCUCHAR reportes en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, 'reports'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      setReports(data);
    });

    return () => unsub();
  }, []);


  // ✅ AGREGAR reporte a Firestore
  const addReport = async (newReport) => {
    try {
      await addDoc(collection(db, 'reports'), {
        ...newReport,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error('Error guardando reporte:', e);
    }
  };


  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

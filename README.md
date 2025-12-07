# 📱 Feed de Reportes - React Native

## ✅ Funcionalidades Implementadas

✓ **Estado global de reportes** usando Context API
✓ **Ubicación GPS** con geocodificación inversa
✓ **Cámara** para capturar fotos
✓ **Permisos** de iOS y Android configurados
✓ **Validaciones** completas del formulario
✓ **Feed dinámico** que muestra reportes en tiempo real

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Instalar librerías de ubicación y cámara

```bash
npm install expo-location expo-image-picker
```

O usando npx:

```bash
npx expo install expo-location expo-image-picker
```

### 3. Ejecutar el proyecto

```bash
npm start
```

### 4. Probar en tu celular

- Descarga **Expo Go** (iOS o Android)
- Escanea el código QR que aparece en la terminal
- ⚠️ **IMPORTANTE:** Debes usar un **dispositivo físico real**, NO simuladores

---

## 📋 Cómo Usar la App

1. **Abrir la app** en Expo Go
2. **Presionar "+ Agregar"** en el header
3. **Activar ubicación** → Acepta los permisos
4. **Agregar imagen** → Acepta permisos de cámara y toma una foto
5. **Escribir descripción** del problema
6. **Enviar reporte** → Verifica que aparezca en el feed

---

## 🎯 Estructura del Proyecto

```
FeedReport-main/
├── App.js                      # ✅ Actualizado con ReportsProvider
├── context/
│   └── ReportsContext.js       # ✅ NUEVO - Estado global
├── Screens/
│   ├── AddReport.js            # ✅ Actualizado con cámara y GPS
│   └── ReportFeed.js           # ✅ Actualizado con estado dinámico
├── components/
│   └── ReportCard.js           # ✅ Actualizado para mostrar imágenes
├── app.json                    # ✅ Actualizado con permisos
├── package.json                # ✅ Actualizado con dependencias
└── assets/
```

---

## 🔑 Permisos Configurados

### iOS (app.json)
- `NSCameraUsageDescription` - Acceso a cámara
- `NSLocationWhenInUseUsageDescription` - Acceso a ubicación

### Android (app.json)
- `CAMERA` - Acceso a cámara
- `ACCESS_FINE_LOCATION` - Ubicación precisa
- `ACCESS_COARSE_LOCATION` - Ubicación aproximada

---

## ⚠️ Importante

### ❌ NO funcionará en simuladores
La cámara y la ubicación GPS requieren un **dispositivo físico real**

### ✅ Primera vez
La primera vez que uses cada función, la app solicitará permisos. **Asegúrate de aceptarlos**.

### 🔄 Si algo falla
1. Verifica que aceptaste los permisos
2. Reinicia la app
3. Desinstala y reinstala si es necesario
4. Verifica que estés usando un dispositivo físico

---

## 📦 Dependencias Agregadas

```json
"expo-location": "~18.0.6"      // Ubicación GPS
"expo-image-picker": "~16.0.7"  // Cámara
```

---

## 🛠️ Solución de Problemas

### "No se puede obtener la ubicación"
- Verifica que el GPS esté activado en tu dispositivo
- Asegúrate de haber aceptado los permisos
- Reinicia la app

### "No se puede abrir la cámara"
- Verifica que hayas aceptado los permisos de cámara
- En iOS: Configuración > Privacidad > Cámara
- En Android: Configuración > Apps > Tu app > Permisos
- Usa un dispositivo físico, no simulador

### "Module not found"
```bash
npm install
npm install expo-location expo-image-picker
```

---

## 📝 Cambios Realizados

### 1. **App.js**
- Agregado `ReportsProvider` para envolver toda la app

### 2. **context/ReportsContext.js** (NUEVO)
- Context API para estado global
- Función `addReport()` para agregar reportes
- Función `deleteReport()` para eliminar reportes

### 3. **Screens/AddReport.js**
- Función `getLocation()` - Obtiene GPS y convierte a dirección
- Función `takePhoto()` - Abre cámara y captura foto
- Función `sendReport()` - Valida y envía el reporte
- Estados para ubicación, imagen y descripción

### 4. **Screens/ReportFeed.js**
- Lee reportes del estado global usando `useReports()`
- Muestra mensaje cuando no hay reportes
- Renderiza dinámicamente todos los reportes

### 5. **components/ReportCard.js**
- Muestra imagen real si existe
- Muestra coordenadas GPS
- Diseño mejorado

### 6. **package.json**
- Agregadas dependencias: `expo-location`, `expo-image-picker`

### 7. **app.json**
- Configurados permisos de iOS y Android
- Plugins de expo-location y expo-image-picker

---

## 🎓 Tecnologías Utilizadas

- **React Native** - Framework
- **Expo** - Plataforma de desarrollo
- **expo-location** - GPS y geocodificación
- **expo-image-picker** - Cámara
- **React Navigation** - Navegación
- **Context API** - Estado global
- **Ionicons** - Iconos

---

## ✨ Próximos Pasos (Opcionales)

1. Persistencia con AsyncStorage
2. Backend con Firebase
3. Autenticación de usuarios
4. Mapa interactivo con coordenadas
5. Notificaciones push
6. Sistema de likes y comentarios

---

## 📞 Documentación Oficial

- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Navigation](https://reactnavigation.org/)
- [React Context](https://react.dev/reference/react/useContext)

---

**¡Proyecto listo para usar! 🎉📱**

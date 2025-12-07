# 📱 Feed de Reportes

App móvil para reportar problemas urbanos con captura de ubicación GPS y fotos en tiempo real.

## 🎯 Descripción

Aplicación React Native que permite a los usuarios crear reportes de problemas urbanos (baches, alumbrado público, basura, etc.) con:
- Ubicación GPS automática con geocodificación inversa
- Captura de fotos directamente desde la cámara
- Feed dinámico de todos los reportes
- Validaciones completas de formularios

## ✨ Características

- ✅ **Ubicación GPS** - Obtiene coordenadas precisas y las convierte en direcciones legibles
- ✅ **Cámara integrada** - Captura fotos del problema directamente desde la app
- ✅ **Estado global** - Usa Context API para compartir datos entre pantallas
- ✅ **Feed dinámico** - Muestra todos los reportes en tiempo real
- ✅ **Validaciones** - Verifica que todos los campos estén completos antes de enviar
- ✅ **Permisos** - Manejo correcto de permisos de cámara y ubicación (iOS y Android)

## 🛠️ Tecnologías

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma para desarrollo y testing
- **React Navigation** - Navegación entre pantallas
- **expo-location** - Servicios de geolocalización
- **expo-image-picker** - Captura de fotos con la cámara
- **Context API** - Manejo de estado global
- **Ionicons** - Librería de iconos

## 📦 Instalación

### Prerequisitos

- Node.js 18.x o superior
- npm o yarn
- Expo Go app en tu dispositivo móvil

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/FeedReport.git

# 2. Entrar al directorio del proyecto
cd FeedReport

# 3. Instalar dependencias
npm install

# 4. Instalar librerías de Expo (IMPORTANTE)
npx expo install expo-location expo-image-picker

# 5. Ejecutar el proyecto
npm start
```

## 📱 Cómo Usar

1. **Descarga Expo Go**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Ejecuta el proyecto**
   ```bash
   npm start
   ```

3. **Escanea el QR**
   - En iOS: Usa la cámara nativa
   - En Android: Usa la app Expo Go

4. **Crea tu primer reporte**
   - Presiona el botón "+ Agregar"
   - Activa la ubicación (acepta permisos)
   - Toma una foto del problema (acepta permisos)
   - Escribe una descripción
   - Envía el reporte
   - ¡Verifica que aparezca en el feed!

## 📂 Estructura del Proyecto

```
FeedReport-main/
├── App.js                      # Componente principal con navegación
├── context/
│   └── ReportsContext.js       # Estado global de reportes
├── Screens/
│   ├── AddReport.js            # Pantalla para crear reportes
│   └── ReportFeed.js           # Pantalla del feed de reportes
├── components/
│   └── ReportCard.js           # Componente de tarjeta de reporte
├── assets/                     # Imágenes e iconos
├── app.json                    # Configuración de Expo
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
```

## 🔑 Características Técnicas

### Context API
El proyecto usa React Context para manejar el estado global de los reportes, permitiendo compartir datos entre las pantallas `AddReport` y `ReportFeed` sin prop drilling.

### Permisos
La app solicita y maneja permisos de:
- **Cámara** - Para capturar fotos
- **Ubicación** - Para obtener coordenadas GPS

Los permisos están configurados en `app.json` para iOS y Android.

### Geocodificación Inversa
Convierte coordenadas GPS (lat/long) en direcciones legibles usando `expo-location`.

## 🚀 Scripts Disponibles

```bash
npm start       # Inicia el servidor de desarrollo
npm run android # Ejecuta en emulador Android
npm run ios     # Ejecuta en emulador iOS
npm run web     # Ejecuta en navegador web
```

## ⚠️ Importante

- **Usa un dispositivo físico** para probar la cámara y ubicación (no funcionan bien en simuladores)
- **Acepta los permisos** cuando la app los solicite
- **Conexión a internet** requerida para geocodificación

## 🐛 Solución de Problemas

### Error al instalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
npx expo install expo-location expo-image-picker
```

### La cámara no abre
- Verifica que hayas aceptado los permisos
- Usa un dispositivo físico (no simulador)
- Revisa que los permisos estén en `app.json`

### La ubicación no se obtiene
- Activa el GPS en tu dispositivo
- Acepta los permisos de ubicación
- Verifica que tengas conexión a internet

## 📸 Screenshots

(Agrega capturas de pantalla de tu app aquí)

## 🔮 Próximas Características

- [ ] Persistencia con AsyncStorage
- [ ] Backend con Firebase
- [ ] Autenticación de usuarios
- [ ] Mapa interactivo con marcadores
- [ ] Sistema de likes y comentarios
- [ ] Notificaciones push
- [ ] Filtros por categoría
- [ ] Búsqueda de reportes

## 👥 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregué nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tuemail@example.com

## 🙏 Agradecimientos

- [Expo](https://expo.dev/) por la excelente plataforma de desarrollo
- [React Native](https://reactnative.dev/) por el framework
- [React Navigation](https://reactnavigation.org/) por la navegación

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

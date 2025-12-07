import './firebaseConfig'; 
console.log('=========================');
console.log('APP.JS: firebaseConfig importado');
console.log('=========================');
import { TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ReportsProvider } from './context/ReportsContext';


import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ReportFeed from './Screens/ReportFeed';
import AddReport from './Screens/AddReport';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* Pantalla de Splash */}
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Pantallas de Autenticación */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ headerShown: false }}
          />

          {/* Pantallas Principales (Main) */}
          <Stack.Screen 
            name="Main" 
            component={ReportFeed} 
            options={({ navigation }) => ({
              title: 'Feed de Reportes',
              headerStyle: {
                backgroundColor: '#1A72DD',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  {/* Botón Agregar Reporte */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddReport')}
                    style={{ 
                      paddingVertical: 5, 
                      paddingHorizontal: 12, 
                      backgroundColor: '#26BD28', 
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 3 }}>
                      Agregar
                    </Text>
                  </TouchableOpacity>

                  {/* Botón Configuración */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    style={{ 
                      marginLeft: 12,
                      paddingVertical: 5, 
                      paddingHorizontal: 10, 
                      backgroundColor: '#fff', 
                      borderRadius: 5,
                    }}
                  >
                    <Ionicons name="settings-outline" size={20} color="#1A72DD" />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          
          <Stack.Screen 
            name="AddReport" 
            component={AddReport} 
            options={{ 
              title: 'Agregar Reporte',
              headerStyle: {
                backgroundColor: '#1A72DD',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ 
              title: 'Configuración',
              headerStyle: {
                backgroundColor: '#1A72DD',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportsProvider>
  );
}

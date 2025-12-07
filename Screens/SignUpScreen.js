import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sanitizar entrada de usuario
  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar nombre
  const validateName = (name) => {
    return name.length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
  };

  // Validar contraseña (mínimo 6 caracteres, una mayúscula, un número)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Manejar registro
  const handleSignUp = async () => {
    // Sanitizar todos los datos
    const sanitizedName = sanitizeInput(fullName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    // Validaciones
    if (!sanitizedName || !sanitizedEmail || !sanitizedPassword || !sanitizedConfirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!validateName(sanitizedName)) {
      Alert.alert(
        'Error', 
        'El nombre debe tener al menos 3 caracteres y solo contener letras'
      );
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      Alert.alert(
        'Error', 
        'La contraseña debe tener al menos 6 caracteres'
      );
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        sanitizedEmail,
        sanitizedPassword
      );

      const user = userCredential.user;

      // Actualizar perfil con el nombre
      await updateProfile(user, {
        displayName: sanitizedName,
      });

      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: sanitizedName,
        email: sanitizedEmail,
        createdAt: new Date(),
        profilePicture: null,
      });

      console.log('✅ Registro exitoso:', user.email);
      setLoading(false);

      Alert.alert(
        'Cuenta creada',
        '¡Tu cuenta ha sido creada exitosamente!',
        [
          {
            text: 'OK',
            onPress: () => {
              // La navegación se manejará automáticamente
            }
          }
        ]
      );
    } catch (error) {
      setLoading(false);
      console.error('❌ Error en registro:', error);
      
      let errorMessage = 'Error al crear la cuenta';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Verifica tu internet';
          break;
        default:
          errorMessage = 'Error al crear la cuenta. Intenta de nuevo';
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A72DD" />
          </TouchableOpacity>
          
          <Ionicons name="person-add" size={60} color="#1A72DD" />
          <Text style={styles.title}>Crear una cuenta</Text>
          <Text style={styles.subtitle}>Ingresar tus datos</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Campo Nombre Completo */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Campo Confirmar Contraseña */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Indicador de fuerza de contraseña */}
          {password.length > 0 && (
            <View style={styles.passwordStrength}>
              <Text style={styles.passwordStrengthText}>
                {password.length < 6 ? '🔴 Contraseña débil' : 
                 password.length < 8 ? '🟡 Contraseña media' : 
                 '🟢 Contraseña fuerte'}
              </Text>
            </View>
          )}

          {/* Botón Crear Cuenta */}
          <TouchableOpacity 
            style={[styles.signupButton, loading && styles.signupButtonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupButtonText}>Crear cuenta</Text>
            )}
          </TouchableOpacity>

          {/* Ya tienes cuenta */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A72DD',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  passwordStrength: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  passwordStrengthText: {
    fontSize: 12,
    color: '#666',
  },
  signupButton: {
    backgroundColor: '#26BD28',
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signupButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#1A72DD',
    fontWeight: '600',
  },
});

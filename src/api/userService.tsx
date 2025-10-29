import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export interface RegisterData {
  email: string;
  hashed_password: string;
  full_name: string;
  country: string;
  age?: number;
  agree_to_terms_and_conditions: boolean;
}

export interface LoginData {
  email: string;
  hashed_password: string;
}

export const userService = {
  register: (data: RegisterData) => client.post('/register', data),
  login: async (data: LoginData) => {
    try {
      const response = await client.post('/login', data);
      const { access_token, ...userData } = response.data; // <--- ✨ ¡Desestructuración Mágica!

      if (access_token) {
        // 1. Guardar el token para la autenticación de APIs
        await AsyncStorage.setItem('token', access_token);

        // 2. Guardar los datos del usuario (ID, full_name, etc.)
        // Necesitas convertir el objeto a string para guardarlo en AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        Alert.alert(
          '✅ Login Exitoso',
          `Bienvenido, ${userData.full_name}. Tu ID es ${userData.id}`,
        );
      } else {
        Alert.alert('⚠️ No se recibió token del backend');
      }

      return response.data;
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión');
      throw error;
    }
  },
};

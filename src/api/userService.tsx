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
      const token = response.data.access_token;

      if (token) {
        await AsyncStorage.setItem('token', token);
        Alert.alert('✅ Token guardado', token);
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

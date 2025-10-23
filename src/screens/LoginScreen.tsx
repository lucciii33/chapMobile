import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import { userService } from '../api/userService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [formLogin, setFormLogin] = useState({
    email: '',
    hashed_password: '',
  });

  type RootStackParamList = {
    Dashboard: undefined;
  };

  const handleChange = (key: string, value: string | boolean) => {
    setFormLogin(prev => ({ ...prev, [key]: value }));
  };

  const navigationDashboard =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const res = await userService.login({
        ...formLogin,
      });
      Alert.alert('✅ login exitoso', `Bienvenido ${res.full_name}`);

      setFormLogin({
        email: '',
        hashed_password: '',
      });

      navigationDashboard.navigate('Dashboard');
    } catch (err: any) {
      console.log(err.response?.data);
      Alert.alert(
        '❌ Error',
        err.response?.data?.detail || 'Error al registrar usuario',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Login</Text>
      <TextInput
        placeholder="Email"
        value={formLogin.email}
        onChangeText={v => handleChange('email', v)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={formLogin.hashed_password}
        onChangeText={v => handleChange('hashed_password', v)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="LOGIN" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
});

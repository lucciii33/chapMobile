import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { PetService } from '../api/petService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetCard } from '../components/PetCard';

export default function DashboardScreen({ navigation }) {
  const { getPets, allPets } = PetService();

  const fetchUserPets = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData.id; // Extrae el ID

        if (userId) {
          console.log(`Buscando mascotas para el usuario ID: ${userId}`);
          await getPets(userId);
        } else {
          console.error(
            'ID de usuario no encontrado en los datos de AsyncStorage.',
          );
        }
      } else {
        console.error('No se encontraron datos de usuario en AsyncStorage.');
      }
    } catch (error) {
      console.error('Error al cargar las mascotas:', error);
    }
  };

  useEffect(() => {
    fetchUserPets();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {allPets.length > 0
          ? `Mascotas encontradas: ${allPets.length}`
          : 'Cargando mascotas o ninguna registrada...'}
      </Text>
      <ScrollView style={{ width: '100%' }}>
        {allPets.map(pet => (
          <PetCard
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            image={pet.profile_photo}
          />
        ))}
      </ScrollView>
      <Button
        title="Volver al Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Volver al Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
  },
});

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import client from './client'; // ajusta la ruta según tu estructura

type Pet = {
  name: string;
  age: number;
  personality: string;
  address: string;
  phone_number: number;
  phone_number_optional: number | null;
  profile_photo: any | null; // En RN será un objeto { uri, type, name }
  pet_color: string;
  breed: string;
  lost: boolean;
  vet_address: string;
  neighbourhood: string;
  mom_name: string;
  dad_name: string;
  chip_number: number;
};

type PetResponse = Pet & {
  id: number;
  profile_photo: string;
  user_id: number;
};

export const PetService = () => {
  const [petProfile, setPetProfile] = useState<PetResponse | null>(null);
  const [allPets, setAllPets] = useState<PetResponse[]>([]);
  const [petByID, setPetByID] = useState<PetResponse | null>(null);

  const getToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('token');
    } catch {
      Alert.alert('Error', 'No se pudo obtener el token.');
      return null;
    }
  };

  const createPet = async (
    userId: number,
    petData: Pet,
  ): Promise<PetResponse | null> => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Usuario no autenticado');

      const formData = new FormData();

      if (petData.profile_photo?.uri) {
        formData.append('profile_photo', {
          uri: petData.profile_photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }

      const { profile_photo, ...petWithoutFile } = petData;
      formData.append('pet', JSON.stringify(petWithoutFile));

      const res = await fetch(
        `${client.defaults.baseURL}/api/users/${userId}/pets`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (!res.ok) throw new Error('Error al crear la mascota');

      const data: PetResponse = await res.json();
      setPetProfile(data);
      Alert.alert('Éxito', 'Mascota creada correctamente.');
      return data;
    } catch (error) {
      console.error('Error al crear la mascota:', error);
      Alert.alert('Error', 'No se pudo crear la mascota.');
      return null;
    }
  };

  const getPets = async (userId: number): Promise<PetResponse[] | null> => {
    // ✅ Usando el tipo PetResponse[]
    try {
      const token = await getToken(); // ✅ Usando await getToken()
      if (!token) throw new Error('Usuario no autenticado');

      // 🛑 CORRECCIÓN FINAL: URL COMPLETA.
      // Se ignora client.defaults.baseURL para evitar el error de ruta.
      const API_URL = `http://localhost:8000/api/users/${userId}/pets`;

      const res = await fetch(
        API_URL, // <-- Usa la URL completa y correcta
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error('Error al obtener mascotas');

      const data: PetResponse[] = await res.json(); // ✅ Usando PetResponse[]
      setAllPets(data);
      return data;
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      Alert.alert('Error', 'No se pudieron cargar las mascotas.');
      return null;
    }
  };

  const getPetById = async (petId: number): Promise<PetResponse | null> => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Usuario no autenticado');

      const res = await fetch(`${client.defaults.baseURL}/api/pets/${petId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Error al obtener la mascota');

      const data: PetResponse = await res.json();
      setPetByID(data);
      return data;
    } catch (error) {
      console.error('Error al obtener mascota:', error);
      Alert.alert('Error', 'No se pudo obtener la mascota.');
      return null;
    }
  };

  const deletePetById = async (petId: number): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Usuario no autenticado');

      const res = await fetch(
        `${client.defaults.baseURL}/api/pets/${petId}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error('Error al eliminar la mascota');

      setAllPets(prev => prev.filter(p => p.id !== petId));
      Alert.alert('Éxito', 'Mascota eliminada.');
      return true;
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      Alert.alert('Error', 'No se pudo eliminar la mascota.');
      return false;
    }
  };

  const editPet = async (
    petId: number,
    petData: Pet,
  ): Promise<PetResponse | null> => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Usuario no autenticado');

      const formData = new FormData();

      if (petData.profile_photo?.uri) {
        formData.append('profile_photo', {
          uri: petData.profile_photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }

      const { profile_photo, ...petWithoutFile } = petData;
      formData.append('pet_update', JSON.stringify(petWithoutFile));

      const res = await fetch(
        `${client.defaults.baseURL}/api/pets/${petId}/edit`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (!res.ok) throw new Error('Error al editar la mascota');

      const data: PetResponse = await res.json();
      Alert.alert('Éxito', 'Mascota actualizada.');
      return data;
    } catch (error) {
      console.error('Error al editar mascota:', error);
      Alert.alert('Error', 'No se pudo actualizar la mascota.');
      return null;
    }
  };

  return {
    petProfile,
    allPets,
    petByID,
    createPet,
    getPets,
    getPetById,
    deletePetById,
    editPet,
  };
};

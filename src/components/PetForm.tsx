import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { PetService } from '../api/petService';

interface PetFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

interface PetFormData {
  name: string;
  breed: string;
  age: string;
  weight: string;
}

export default function PetForm({ onSuccess, onCancel }: PetFormProps) {
  //   const { createPet } = PetService();
  const [form, setForm] = useState<PetFormData>({
    name: '',
    breed: '',
    age: '',
    weight: '',
  });

  const handleSubmit = async () => {
    onSuccess(form);
    // try {
    //   const response = await createPet(form);
    //   if (response?.success) onSuccess(response.data);
    // } catch (error) {
    //   console.error('Pet creation failed:', error);
    // }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Pet Info</Text>
      {Object.keys(form).map(key => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          value={(form as any)[key]}
          onChangeText={text => setForm({ ...form, [key]: text })}
        />
      ))}
      <Button title="Next" onPress={handleSubmit} />
      <Button title="Cancel" color="red" onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
  },
});

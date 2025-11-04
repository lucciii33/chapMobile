import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface TagFormProps {
  onSuccess: (data: any) => void;
}

interface TagFormData {
  tagText: string;
  color: string;
  phone: string;
}

export default function TagForm({ onSuccess }: TagFormProps) {
  const [form, setForm] = useState<TagFormData>({
    tagText: '',
    color: '',
    phone: '',
  });

  const handleSubmit = async () => {
    try {
      // Replace with your real API call for tag creation
      onSuccess(form);
    } catch (error) {
      console.error('Tag creation failed:', error);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Tag Info</Text>
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

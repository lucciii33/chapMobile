import { useState } from 'react';
import { Alert } from 'react-native';

export const useForm = <T extends object>(
  initialValues: T,
  requiredFields: (keyof T)[] = [],
) => {
  const [form, setForm] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (key: keyof T, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: false }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, boolean>> = {};
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      const value = form[field];
      if (!value || value === '') {
        newErrors[field] = true;
        missingFields.push(String(field));
      }
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      const formatted = missingFields.join(', ');
      Alert.alert(
        '⚠️ Campos requeridos',
        `Por favor completa los siguientes campos:\n${formatted}`,
      );
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setForm(initialValues);
    setErrors({});
  };

  return { form, handleChange, validate, resetForm, errors };
};

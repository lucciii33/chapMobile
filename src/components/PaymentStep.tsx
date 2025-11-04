import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface PaymentStepProps {
  onFinish: () => void;
}

export default function PaymentStep({ onFinish }: PaymentStepProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Payment or Cart</Text>
      <Button title="Finish" onPress={onFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});

import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
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

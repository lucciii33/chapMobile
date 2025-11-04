import React from 'react';

import { useUser } from '../context/useUser';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderDashboardProps {
  onAddPress: () => void;
}

export const HeaderDashboard = ({ onAddPress }: HeaderDashboardProps) => {
  const { user } = useUser();

  return (
    <View style={styles.containerHeader}>
      <View>
        <Text>{user?.full_name ?? 'Sin usuario'}</Text>
      </View>
      <View>
        <Pressable
          style={styles.addButton}
          onPress={onAddPress}
          accessibilityLabel="Agregar"
        >
          <Icon name="add" size={24} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    flexDirection: 'row', // 👈 equivalente a display: flex
    justifyContent: 'space-between', // 👈 separa los elementos
    alignItems: 'center', // 👈 centra verticalmente
  },
  addButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';

export interface PetCardProps {
  name: string;
  breed: string;
  age: number;
  image: string;
}

export const PetCard: React.FC<PetCardProps> = ({
  name,
  breed,
  age,
  image,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: encodeURI(image), // fuerza que sea una URL válida
        }}
        style={styles.image}
        onError={e => {
          Alert.alert('Error de imagen', JSON.stringify(e.nativeEvent));
        }}
        onLoad={() => {
          Alert.alert('Cargó bien', image);
        }}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age} años</Text>
        </View>
        <Text style={styles.breed}>{breed}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  age: {
    fontSize: 15,
    color: '#666',
  },
  breed: {
    fontSize: 15,
    color: '#777',
    marginTop: 6,
  },
});

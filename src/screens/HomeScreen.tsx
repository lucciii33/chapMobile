import React, { useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const letters = ['C', 'H', 'A', 'P'];

  const animations = useRef(letters.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animationsList = animations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(150, animationsList).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.container_2}>
        {letters.map((letter, i) => (
          <Animated.Text
            key={i}
            style={[
              styles.letter,
              {
                opacity: animations[i],
                transform: [
                  {
                    translateY: animations[i].interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>

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
  container_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  letter: {
    fontSize: 58,
    fontFamily: 'Super Cottage',
  },
});

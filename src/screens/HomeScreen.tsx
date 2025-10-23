import React, { useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  useEffect(() => {
    const letterDuration = 500;
    const staggerDelay = 150;
    const totalTime = letterDuration + staggerDelay * (letters.length - 1);

    const redirectTime = totalTime + 1000;

    const timeout = setTimeout(() => {
      navigationLogin.navigate('Login');
    }, redirectTime);

    return () => clearTimeout(timeout);
  }, []);

  type RootStackParamList = {
    Login: undefined;
  };

  const navigationLogin =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.letter_2}>Welcome to</Text>
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

      {/* <Button
        title="Volver al Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Volver al Register"
        onPress={() => navigation.navigate('Register')}
      /> */}
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
    // marginTop: 100,
  },
  letter: {
    fontSize: 120,
    fontFamily: 'Super Cottage',
  },
  letter_2: {
    fontSize: 40,
    fontWeight: '300',
    marginBottom: -40,
  },
});

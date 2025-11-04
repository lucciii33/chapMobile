/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 👈 añade esto

// Ionicons.loadFont();
Ionicons.loadFont().then(() => console.log('✅ Ionicons cargado'));

AppRegistry.registerComponent(appName, () => App);

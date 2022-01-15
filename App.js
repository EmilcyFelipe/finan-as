import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import firebase from './src/services/firebaseConnection'

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar backgroundColor='#131313' barStyle='light-content'/>
        <Routes/>
    </NavigationContainer>
  );
}

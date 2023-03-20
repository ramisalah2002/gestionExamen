import {StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { Switch } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './routes/HomeStack';

const Stack = createNativeStackNavigator();

export default function App()  {
  return (
    <Home />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
  }
})

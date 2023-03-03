import {Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { TailwindProvider } from 'tailwindcss-react-native';

const TestScreen = ({navigation}) => {
  const ProfChoice = () =>{
    navigation.navigate('TestScreen');
  }
  const StudentChoice = () =>{
    navigation.navigate('LoginStudent');
  }
  return (
    <View style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.logoImg} />
        <Text style={styles.title}>Bonjour!</Text>
        <TouchableOpacity style={styles.touchable} onPress={ProfChoice}>
            <Image source={require('../images/profImg.png')} style={styles.image} />
            <Text style={styles.typeText}>Professeur</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={StudentChoice}>
            <Image source={require('../images/studentImg.png')} style={styles.image} />
            <Text style={styles.typeText}>Etudiant</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
  },
  title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: '700',
  },
  touchable: {
      width: 170,
      height: 170,
      borderRadius: 5,
      marginBottom: 10,
      overflow: 'hidden',
      backgroundColor: '#edeff2',
      alignItems: 'center',
      justifyContent: 'center',
  },
  image: {
      width: '80%',
      height: '80%',
  },
  logoImg: {
      width: 100,
      height: 40,
      marginBottom: 80,
  },
  
  typeText: {
    fontSize: 20,
    fontWeight: '600', 
  }
});
export default TestScreen;

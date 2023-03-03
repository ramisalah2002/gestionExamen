import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SecondScreen({ route }) {
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

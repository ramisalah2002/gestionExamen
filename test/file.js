// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';

// const TestScreen = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/users');
//         const result = await response.json();
//         setUsers(result);
//       } catch (error) {
//         console.error(error);
//       }
//     };    
//     fetchData();
//   }, []);

//   return (
//     <View>
//       {users.map(user => (
//         <View key={user.email}>
//           <Text>Email: {user.email}</Text>
//           <Text>Password: {user.password}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default TestScreen;





import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const File = ({navigation}) => {
  const pressHandler = () =>{
    navigation.navigate('LoginScreen');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Image
        source={require('../images/bigLogo.jpg')}
        style={styles.image}
      />
      <Text style={styles.title}>Your path to the</Text>
      <Text style={styles.title}>future</Text>
      {/* <Text style={styles.paragraph}>Small paragraph</Text> */}
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 400,
    borderRadius: 10,
    marginTop: 50,
    marginBottom:30,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
  },
  paragraph: {
    fontSize: 18,
  },
  button: {
    marginTop:40,
    backgroundColor: '#48bee6',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    textAlign:'center',
    padding:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default File;


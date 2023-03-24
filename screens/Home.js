// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// function Dashboard() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Dashboard Screen</Text>
//     </View>
//   );
// }

// function Exams() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Exams Screen</Text>
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator useLegacyImplementation>
//       <Drawer.Screen name="Dashboard" component={Dashboard} />
//       <Drawer.Screen name="Exams" component={Exams} />
//     </Drawer.Navigator>
//   );
// }

// export default function Home() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }

import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Home({navigation}) {
  const pressHandlerLogin = () =>{
    navigation.navigate('LoginScreen');
  }
  const pressHandlerSign = () =>{
    navigation.navigate('SignupScreen');
  }
  
  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Image
          source={require('../images/testLogo.jpg')}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>L'examen en ligne n'a jamais été aussi simple</Text>
        </View>
        {/* <Text style={styles.paragraph}>Small paragraph</Text> */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={pressHandlerSign} style={styles.buttonSign}>
            <Text style={styles.buttonText}>s'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pressHandlerLogin} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#dde6f2',
  },
  content: {
    width:'95%',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 30,
  },
  titleContainer: {
    width:'100%',
    alignItems:'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign:'center',
    color:'#363349'
  },
  paragraph: {
    fontSize: 18,
  },
  buttonsContainer: {
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:100,
  },
  buttonSign: {
    borderColor:"#fefeff",
    borderWidth:1,
    borderBottomLeftRadius:10,
    borderTopLeftRadius:10,
    backgroundColor: '#fff',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonLogin: {
    borderColor:"#fefeff",
    borderWidth:1,
    backgroundColor: '#eaecf6',
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


// // import React, { useState, useEffect } from 'react';
// // import { View, Text } from 'react-native';

// // const TestScreen = () => {
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('http://127.0.0.1:8000/users');
// //         const result = await response.json();
// //         setUsers(result);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };    
// //     fetchData();
// //   }, []);

// //   return (
// //     <View>
// //       {users.map(user => (
// //         <View key={user.email}>
// //           <Text>Email: {user.email}</Text>
// //           <Text>Password: {user.password}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   );
// // };

// // export default TestScreen;







// import React, { useEffect, useState } from 'react';
// import { FlatList, Text, View } from 'react-native';

// export default Home = () => {
//   const [data, setData] = useState([]);
//   console.log(data);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/users')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error(error))
//   }, []);

//   return (

//     <View style={{ flex: 1, padding: 24 }}>
//       {
//       ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
//           <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Users:</Text>
//           <FlatList
//             data={data.users}
//             keyExtractor={({ id }, index) => id}
//             renderItem={({ item }) => (
//               <Text>{item.id + '. ' + item.name}</Text>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// }


// import React , {useState} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { CheckBox } from 'react-native-elements';





// export default function App() {
//   const [checkBoxValue, setChackBoxValue] = useState(false);

//   return (
//     <View>
//       <Text>Test</Text>
//       <Text>Test</Text>
//       <Text>Test</Text>
//       <CheckBox 
//         containerStyle={{marginLeft:0,width:'100%'}}
//         title={'circle Checkbox'}
//         checked={checkBoxValue}
//         onPress={()=>setChackBoxValue(!checkBoxValue)}
//         checkedIcon={'dot-circle-o'}
//         uncheckedIcon={'circle-o'}
//       />
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
  
// });





// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function ImagePickerExample() {
  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }



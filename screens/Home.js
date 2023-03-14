import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Home({navigation}) {
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
      <Text style={styles.title}>votre chemin vers</Text>
      <Text style={styles.title}>l'avenir</Text>
      {/* <Text style={styles.paragraph}>Small paragraph</Text> */}
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
        <Text style={styles.buttonText}>Commencer</Text>
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



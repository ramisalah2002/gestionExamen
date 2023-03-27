import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

export default function deptChoiceScreen({ navigation }) {

  const etudiant_nom = navigation.getParam('userNom');
  const etudiant_prenom = navigation.getParam('userPrenom');
  const etudiant_email = navigation.getParam('userEmail');
  const etudiant_password = navigation.getParam('userPassword');

  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);


  useEffect(() => {
    axios.get("http://10.0.2.2:8000/api/filieres")
      .then(res => {
        setFilieres(res.data);
        setSelectedFiliere(res.data[0]);
      })
      .catch(error => {
        console.log(`Error fetching filieres: ${error}`);
      });
  }, []);

  const handleFiliereChange = (value) => {
    const selectedFiliere = filieres.find((f) => f.id === parseInt(value));
    setSelectedFiliere(selectedFiliere);
  };

  const handleRegister = (
    nom,
    prenom,
    email,
    filiere_id,
    password
  ) => {
    axios
      .post("http://10.0.2.2:8000/api/register", {
        nom,
        prenom,
        email,
        password,
        filiere_id : selectedFiliere.id, // Pass the selected filiere's id as filiere_id parameter
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={styles.iconBack}
              name="arrowleft"
              size={30}
              color="#3d394e"
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../images/choice.jpg')}
          style={styles.image}
        />
        <View style={{ width: '100%', marginBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: '900' }}>{navigation.getParam('userNom')}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>
            Filière
          </Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedFiliere?.id}
            onValueChange={handleFiliereChange}
          >
            {filieres.map((filiere) => (
              <Picker.Item key={filiere.id} label={filiere.nom} value={filiere.id} />
            ))}
          </Picker>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => handleRegister(nom, etudiant_prenom, etudiant_email, etudiant_password)} style={styles.button}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
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
  iconBack: {
    marginTop:30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#448dfd',
    marginBottom:5,
  },
  titleText: {
    fontSize:36,
    fontWeight:'bold',
    color:"#48bee6",
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#302ea6',
    padding: 13,
    borderRadius: 5,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 55,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom:20,
  },
  pickerContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  picker: {
    height: 50,
    width:'100%',
    color:'#000',
    fontWeight:'900',
    fontSize:28,
    backgroundColor: '#fefefe',
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selection: {
    alignItems: 'flex-start',
    flexDirection:'column',
  },
  selectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2AA2C8'
  },
  selected: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555'
  },
});
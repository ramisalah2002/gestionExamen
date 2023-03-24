import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from "@expo/vector-icons";


const departments = [
  {
    id: 1,
    name: 'Informatique',
    classes: [
      { id: 1, name: 'Génie Logiciel' },
      { id: 2, name: 'Réseau informatique' },
    ],
  },
  {
    id: 2,
    name: 'industriel',
    classes: [
      { id: 1, name: 'Génie civil' },
      { id: 2, name: 'Génie bio industriel' },
    ],
  },
];

export default function deptChoiceScreen({navigation}) {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedClass, setSelectedClass] = useState(selectedDepartment.classes[0]);

  const handleDepartmentChange = (value) => {
    const department = departments.find((d) => d.id === parseInt(value));
    setSelectedDepartment(department);
    setSelectedClass(department.classes[0]);
  };

  const handleClassChange = (value) => {
    const classObj = selectedDepartment.classes.find((c) => c.id === parseInt(value));
    setSelectedClass(classObj);
  };

  const handleSignup = () => {
    navigation.navigate('HomeTestScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={{width:'100%',}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
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
          <View style={{width:'100%',marginBottom:15}}>
            <Text style={{fontSize:30,fontWeight:'900'}}>Choix de filière</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>
              Département
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedDepartment.id}
              onValueChange={handleDepartmentChange}
            >
              {departments.map((department) => (
                <Picker.Item key={department.id} label={department.name} value={department.id} />
              ))}
            </Picker>
            <Text style={styles.pickerTitle}>
              Filière
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedClass.id}
              onValueChange={handleClassChange}
            >
              {selectedDepartment.classes.map((classObj) => (
                <Picker.Item key={classObj.id} label={classObj.name} value={classObj.id} />
              ))}
            </Picker>
          </View>
      </ScrollView>
          <TouchableOpacity onPress={handleSignup} style={styles.button}>
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
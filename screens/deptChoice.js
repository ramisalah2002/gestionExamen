import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

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

export default function deptChoiceScreen() {
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

  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
            Choisir votre Département et Filière
            </Text>
        </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>
          Choisir votre Département
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
          Choisir votre Filière
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
      <View style={styles.selection}>
        <Text style={styles.selectionText}>Vous avez choisi:</Text>
        <Text style={styles.selected}>Département : {selectedDepartment.name}</Text>
        <Text style={styles.selected}>Filière : {selectedClass.name}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:70,
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor:'#F6FEFF',
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
    color: '#1982C4',
    marginBottom:5,
  },
  titleText: {
    fontSize:36,
    fontWeight:'bold',
    color:"#48bee6",
  },
  button: {
    marginTop: 30,
    backgroundColor: '#48bee6',
    padding: 13,
    borderRadius: 5,
    width: '100%',
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
    backgroundColor: '#90E0EF',
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
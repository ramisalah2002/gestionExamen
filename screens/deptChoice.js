import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const deptChoiceScreen = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleDepartmentPress = (department) => {
    setSelectedDepartment(department);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.departmentButton, selectedDepartment === 'Informatique' && styles.selectedButton]} 
        onPress={() => handleDepartmentPress('Informatique')}>
        <Text style={[styles.departmentText, selectedDepartment === 'Informatique' && styles.selectedText]}>Informatique</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.departmentButton, selectedDepartment === 'Urbain' && styles.selectedButton]} 
        onPress={() => handleDepartmentPress('Urbain')}>
        <Text style={[styles.departmentText, selectedDepartment === 'Urbain' && styles.selectedText]}>Urbain</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.departmentButton, selectedDepartment === 'Maintenance' && styles.selectedButton]} 
        onPress={() => handleDepartmentPress('Maintenance')}>
        <Text style={[styles.departmentText, selectedDepartment === 'Maintenance' && styles.selectedText]}>Maintenance</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.departmentButton, selectedDepartment === 'Technique' && styles.selectedButton]} 
        onPress={() => handleDepartmentPress('Technique')}>
        <Text style={[styles.departmentText, selectedDepartment === 'Technique' && styles.selectedText]}>Technique</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width:'90%',
  },
  departmentText: {
    fontSize: 20,
    color: 'gray',
  },
  selectedButton: {
    borderColor: '#2aa2c8',
    backgroundColor:'#cfeef0',
  },
  selectedText: {
    color: 'black',
  },
});

export default deptChoiceScreen;
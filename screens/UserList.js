import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const UserList = () => {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/api/etudiants/')
      .then(response => setEtudiants(response.data))
      .catch(error => console.error(error))
  }, []);

  return (
    <View>
      {etudiants.map(etudiant => (
        <View key={etudiant.id}>
          <Text>{etudiant.nom} {etudiant.prenom}</Text>
          <Text>{etudiant.email}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      {data.map(item => (
        <View key={item.id}>
          <Text>{item.id}</Text>
          <Text>{item.email}</Text>
          <Text>{item.first_name} {item.last_name}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserList;

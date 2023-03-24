import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import { AntDesign } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeTestScreen from "../screens/HomeTest";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor:'#302ea6',
      drawerActiveTintColor:'#FFF',
      drawerInactiveTintColor:'#000',
      drawerLabelStyle: {
        fontFamily: 'Roboto',
        fontSize: 18,
        marginLeft:-20,
        fontWeignt: '900',
      },
      drawerStyle: {
        backgroundColor:'#dde6f2'
      }
    }}>
        <Drawer.Screen options={{drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),}} 
            name="Accueil" component={HomeTestScreen} 
        />
        <Drawer.Screen options={{drawerIcon: ({color}) => (
            <Ionicons name="today-outline" size={22} color={color} />
          ),}} 
            name="Examens d'aujourd'hui" component={HomeTestScreen} 
        />
        <Drawer.Screen options={{drawerIcon: ({color}) => (
            <AntDesign name="export2" size={22} color={color} />
          ),}} 
            name="Examens passés" component={HomeTestScreen} 
        />
        <Drawer.Screen options={{drawerIcon: ({color}) => (
            <Ionicons name="git-compare-outline" size={22} color={color} />
          ),}} 
            name="Examens à venir" component={HomeTestScreen} 
        />
        <Drawer.Screen options={{drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),}} 
            name="Profile" component={HomeTestScreen} 
        />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

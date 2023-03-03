import {Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';




  
  function LoginProf({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [iconName, setIconName] = useState("eye");
  
    const isDisabled = !(email.length > 0 && password.length > 0);
  
    const handleSubmit = () => {
      // Perform login logic here
      console.log(`Email: ${email}, Password: ${password}`);
    };

    const pressHandler = () =>{
        navigation.navigate('ProfSign');
    }
  
    return (
      <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logoImg} />
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.emailField}>
            <Icon style={styles.icon} size={24} color='#bbbcc0' name='envelope'/>
            <TextInput selectionColor='#000' placeholder="Email" placeholderTextColor="#bbbcc0" value={email} onChangeText={setEmail} style={styles.input}/>
        </View>
        <View style={styles.passwordField}>
            <Icon style={styles.icon} size={34} color='#bbbcc0' name='lock'/>
            <TextInput selectionColor='#000' placeholder="Password" placeholderTextColor="#bbbcc0" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={styles.input}/>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} value={showPassword}><Icon style={styles.icon} size={26}  color='#bbbcc0' name={showPassword ? 'eye-slash' : 'eye'}/></TouchableOpacity>
            
        </View>
        
        <View style={styles.switchContainer}>
          {/* <Text style={styles.switchLabel}>Show Password</Text> */}
          {/* <Switch onValueChange={setShowPassword} value={showPassword} /> */}
        </View>
        <TouchableOpacity style={styles.button}
          onPress={handleSubmit}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>
        <View style={styles.divisionLine}></View>
        <View style={styles.signup}>
            <Text style={styles.signupText}>
            Vous n'avez pas encore de compte? 
            </Text>
            <TouchableOpacity onPress={pressHandler}>
                <Text style={styles.signupBtn}> S'inscrire</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 80,
    },
    signupText :{
        fontSize: 18,
        fontWeight: '600',
        color: '#999999',
        marginTop: 25,
    },
    divisionLine: {
      marginTop: 40,
      backgroundColor:'#bbbcc0', 
      width: '90%',
      borderRadius: 10,
      height: 0.9,
    },
    signupBtn :{
        fontSize: 20,
        fontWeight: '900',
        color: '#48bee6',
    },
    input: {
      width: '85%',
      height: 35,
      borderRadius: 5,
      border: 'none',
      marginVertical: 10,
      paddingHorizontal: 10,
      fontSize: 18,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#48bee6',
      padding: 13,
      borderRadius: 5,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      height: 55,
    },
    signup: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchLabel: {
      marginRight: 10,
    },
    logoImg: {
        width: 100,
        height: 40,
        marginBottom: 80,
    },
    emailField: {
        backgroundColor: '#edeff2',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        paddingLeft: 10,
        borderWidth: 1,
        marginBottom:15,
    },
    passwordField: {
        backgroundColor: '#edeff2',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        borderWidth: 1,
        marginBottom:15,
    },
    title: {
      fontSize: 28,
      marginBottom: 15,
      fontWeight: '800',
    }
  });
export default LoginProf;
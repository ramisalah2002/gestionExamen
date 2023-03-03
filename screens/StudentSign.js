import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';




  
  function StudentSign({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [iconName, setIconName] = useState("eye");

    
  
    const isDisabled = !(email.length > 0 && password.length > 0);
  
    const handleSubmit = () => {
      console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    };

    const pressHandler = () =>{
        navigation.navigate('LoginStudent');
    }

    const checkPasswordStrength = password => {
        let strengthLevel = 0;
    
        if (password.length === 0) {
          return strengthLevel;
        }
    
        const containsUppercase = /[A-Z]/.test(password);
        const containsLowercase = /[a-z]/.test(password);
        const containsNumber = /[0-9]/.test(password);
        const containsSpecial = /[!@#$%^&*)(+=._-]/.test(password);
    
        if (containsUppercase) {
          strengthLevel++;
        }
        if (containsLowercase) {
          strengthLevel++;
        }
        if (containsNumber) {
          strengthLevel++;
        }
        if (containsSpecial) {
          strengthLevel++;
        }
    
        return strengthLevel;
      };
    
      const getPasswordStrengthViews = strengthLevel => {
        const views = [];
        for (let i = 0; i < 4; i++) {
          let backgroundColor = '#edeff2';
          if (i < strengthLevel) {
            switch (i) {
              case 0:
                backgroundColor = 'red';
                break;
              case 1:
                backgroundColor = 'orange';
                break;
              case 2:
                backgroundColor = 'yellow';
                break;
              case 3:
                backgroundColor = 'green';
                break;
            }
          }
          views.push(
            <View key={i} style={[styles.passwordStrengthView, { backgroundColor }]} />
          );
        }
        return views;
      };
    
      const strengthLevel = checkPasswordStrength(password);
      const passwordStrengthViews = getPasswordStrengthViews(strengthLevel);
  
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logoImg} />
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.titleContainer}>
            <Text style={styles.miniTitle}>Nom</Text>
        </View>
        <View style={styles.nameField}>
            <Icon style={styles.icon} size={20} color='#bbbcc0' name='user'/>
            <TextInput selectionColor='#000' placeholder="john doe" placeholderTextColor="#bbbcc0" value={name} onChangeText={setName} style={styles.input}/>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.miniTitle}>Email</Text>
        </View>
        <View style={styles.emailField}>
            <Icon style={styles.icon} size={20} color='#bbbcc0' name='envelope'/>
            <TextInput selectionColor='#000' placeholder="exemple@mail.com" placeholderTextColor="#bbbcc0" value={email} onChangeText={setEmail} style={styles.input}/>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.miniTitle}>Mot de passe</Text>
        </View>
        <View style={styles.passwordField}>
            <Icon style={styles.icon} size={30} color='#bbbcc0' name='lock'/>
            <TextInput selectionColor='#000' placeholder="au moins 8 caractères" placeholderTextColor="#bbbcc0" value={password} onChangeText={text => setPassword(text)} secureTextEntry={!showPassword} style={styles.input}/>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} value={showPassword}><Icon style={styles.icon} size={22}  color='#bbbcc0' name={showPassword ? 'eye-slash' : 'eye'}/></TouchableOpacity>
        </View>
        <View style={styles.passwordStrengthContainer}>
            {passwordStrengthViews}
        </View>
        <TouchableOpacity style={styles.button}
          onPress={handleSubmit}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        <View style={styles.divisionLine}></View>
        <View style={styles.signup}>
            <Text style={styles.signupText}>
            Vous avez déjà un compte? 
            </Text>
            <TouchableOpacity onPress={pressHandler}>
                <Text style={styles.signupBtn}> Se Connecter</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      
    );
  }

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: '#fff',
    },
    passwordStrengthContainer: {
        width: '90%',
        height: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderRadius: 5,
      },
      passwordStrengthView: {
        width: '23%',
        borderRadius: 5,
      },
    container: {
      flex:1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 60,
    },
    checkerLine: {
      width: '23%',
      height: 5 ,
      backgroundColor: '#bbbcc0',
      borderRadius: 5, 
    },
    passwordChecker: {
      width: '90%',
      alignItems: 'center',
      justifyContent:'space-between',
      flexDirection: 'row',
      height: 5,
      marginTop: 10,
    },
    titleContainer: {
      alignItems: 'flex-start',
      width: '90%',
    },
    signupText :{
        fontSize: 18,
        fontWeight: '600',
        color: '#999999',
    },
    miniTitle :{
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    divisionLine: {
      marginTop: 15,
      backgroundColor:'#bbbcc0', 
      width: '90%',
      borderRadius: 10,
      height: 1.5,
    },
    signupBtn :{
        fontSize: 20,
        fontWeight: '900',
        color: '#fbd303',
    },
    input: {
      width: '85%',
      height: 30,
      borderRadius: 5,
      border: 'none',
      marginVertical: 10,
      paddingHorizontal: 10,
      fontSize: 18,
    },
    button: {
      marginTop: 10,
      backgroundColor: '#fbd303',
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
    logoImg: {
        width: 100,
        height: 40,
        marginBottom: 80,
        position: 'relative',
    },
    emailField: {
        backgroundColor: '#edeff2',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom:15,
    },
    nameField: {
        marginBottom:15,
        backgroundColor: '#edeff2',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    passwordField: {
        backgroundColor: '#edeff2',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    title: {
      fontSize: 28,
      marginBottom: 15,
      fontWeight: '800',
    }
  });
export default StudentSign;
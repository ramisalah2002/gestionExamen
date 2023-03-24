import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from "@expo/vector-icons";

export default function SignupScreen({navigation}){
    const [activeButton, setActiveButton] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(null);
    
    const [showPassword, setShowPassword] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [iconName, setIconName] = useState("eye");

    // const isDisabled = (name.length > 0 && email.length > 0 && password.length > 0); L ASLYA HYA HADI
    const isDisabled = (name.length > 0 && email.length > 0 && password.length > 0);

    const handlePressTeacher = () => {
      setUserType('teacher');
      setActiveButton(1);
    };
  
    const handlePressStudent = () => {
      setUserType('student');
      setActiveButton(2);
    };
    
    const handleSignup = () => {
        navigation.navigate('deptChoiceScreen');
    };

    const handlePressLogin = () => {
      navigation.navigate('LoginScreen');
    };

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
    <View style={styles.container}>
      <ScrollView style={styles.content}>
          <View style={styles.loginContainer}>
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
                  source={require('../images/signup.jpg')}
                  style={styles.image}
                />
                <View style={{width:'100%',marginBottom:20}}>
                  <Text style={{fontSize:30,fontWeight:'900'}}>Sign Up</Text>
                </View>
              <View style={styles.emailField}>
                  <AntDesign
                    style={styles.icon}
                    name="user"
                    size={24}
                    color="#3d394e"
                  />
                  <TextInput selectionColor='#000' placeholder="Nom complet" placeholderTextColor="#bbbcc0" value={name} onChangeText={setName} style={styles.input}/>
              </View>
              <View style={styles.emailField}>
                  <AntDesign
                    style={styles.icon}
                    name="mail"
                    size={24}
                    color="#3d394e"
                  />
                  <TextInput selectionColor='#000' placeholder="Email" placeholderTextColor="#bbbcc0" value={email} onChangeText={setEmail} style={styles.input}/>
              </View>
              <View style={styles.passwordField}>
                  <AntDesign
                    style={styles.icon}
                    name="lock1"
                    size={26}
                    color="#3d394e"
                  />
                  <TextInput selectionColor='#000' placeholder="Mot de passe" placeholderTextColor="#bbbcc0" value={password} onChangeText={text => setPassword(text)} secureTextEntry={!showPassword} style={styles.input}/>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} value={showPassword}><Icon style={styles.icon} size={22}  color='#000' name={showPassword ? 'eye-slash' : 'eye'}/></TouchableOpacity>
              </View>
              <View style={styles.passwordStrengthContainer}>
                  {passwordStrengthViews}
              </View>
              <TouchableOpacity onPress={handleSignup} style={styles.button}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onTouchStart={() => setIsHovering(true)}
                onTouchEnd={() => setIsHovering(false)}
                disabled={isDisabled}
              >
                <Text style={styles.buttonText}>Continuer</Text>
              </TouchableOpacity>
              <View style={styles.divisionLine}></View>
              <TouchableOpacity onPress={handlePressLogin} style={styles.signup}>
                  <Text style={styles.signupText}>
                  Vous avez déjà un compte? 
                  </Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
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
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  loginContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  choiceImage: {
    alignItems:'center',
  },
  choiceText: {
    marginTop: 5,
    fontSize:16,
  },
  titleText: {
    fontSize:36,
    fontWeight:'bold',
    color:"#48bee6",
  },
  choiceContainer: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonTouch: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor:'#e8e8e8',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  active: {
    borderColor: '#00f',
    borderWidth: 1,
  },
  passwordStrengthContainer: {
    width: '100%',
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
  checkerLine: {
    width: '23%',
    height: 5 ,
    backgroundColor: '#bbbcc0',
    borderRadius: 5, 
  },
  passwordChecker: {
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'row',
    height: 5,
    marginTop: 5,
  },
  titleContainer: {
    marginTop:50,
    alignItems: 'flex-start',
  },
  signupText :{
      fontSize: 18,
      fontWeight: '600',
      color: '#999999',
      paddingBottom:40,
  },
  miniTitle :{
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
  },
  divisionLine: {
    marginTop: 15,
    backgroundColor:'#bbbcc0', 
    width: '100%',
    borderRadius: 10,
    height: 1.5,
  },
  signupBtn :{
      fontSize: 20,
      fontWeight: '900',
      color: '#48bee6',
  },
  input: {
    width: '85%',
    height: 30,
    borderRadius: 5,
    border: 'none',
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '300',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#302ea6',
    padding: 13,
    borderRadius: 5,
    width: '100%',
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
      backgroundColor: '#fefefe',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      paddingLeft: 10,
      borderColor: '#000',
      marginBottom:15,
  },

  passwordField: {
      backgroundColor: '#fefefe',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      paddingLeft: 10,
      borderColor: '#000',
  },
});
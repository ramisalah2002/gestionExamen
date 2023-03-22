import {
  ScrollView,
  Switch,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";

export default function LoginScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [iconName, setIconName] = useState("eye");

  
  const handleLogin = () => {
    fetch("http://10.0.2.2:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Save the token in state or storage
          const token = data.token;
          let userInfo = data;
          console.log(userInfo);
          navigation.navigate("dashboardScreen", { token: token });
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong");
      });
  };
  const handlePressSignup = () => {
    navigation.navigate("ExamCorrection");
  };
  const handlePressPassed = () => {
    navigation.navigate("dashboardScreen");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Bienvenue</Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.emailField}>
            <Icon
              style={styles.icon}
              size={20}
              color="#bbbcc0"
              name="envelope"
            />
            <TextInput
              selectionColor="#000"
              placeholder="nom_prenom@exemple.ma"
              placeholderTextColor="#bbbcc0"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.passwordField}>
            <Icon style={styles.icon} size={30} color="#bbbcc0" name="lock" />
            <TextInput
              selectionColor="#000"
              placeholder="mot de passe"
              placeholderTextColor="#bbbcc0"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              value={showPassword}
            >
              <Icon
                style={styles.icon}
                size={22}
                color="#bbbcc0"
                name={showPassword ? "eye-slash" : "eye"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            //onPress={handlePressPassed}
            onPress={handleLogin}
            style={styles.button}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity style={styles.signup} onPress={handlePressSignup}>
            <Text style={styles.signupText}>
              Vous n'avez pas encore de compte?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginContainer: {
    marginTop: 40,
    alignItems: "center",
    width: "90%",
  },

  choiceImage: {
    alignItems: "center",
  },
  choiceText: {
    marginTop: 5,
    fontSize: 16,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#48bee6",
  },
  choiceContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonTouch: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  active: {
    borderColor: "#00f",
    borderWidth: 1,
  },
  passwordStrengthContainer: {
    width: "90%",
    height: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 5,
  },
  passwordStrengthView: {
    width: "23%",
    borderRadius: 5,
  },
  checkerLine: {
    width: "23%",
    height: 5,
    backgroundColor: "#bbbcc0",
    borderRadius: 5,
  },
  passwordChecker: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 5,
    marginTop: 10,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "flex-start",
    width: "95%",
  },
  signupText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999999",
  },
  miniTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  divisionLine: {
    marginTop: 15,
    backgroundColor: "#bbbcc0",
    width: "100%",
    borderRadius: 10,
    height: 1.5,
  },
  signupBtn: {
    fontSize: 20,
    fontWeight: "900",
    color: "#48bee6",
  },
  input: {
    width: "85%",
    height: 30,
    borderRadius: 5,
    border: "none",
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "300",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#48bee6",
    padding: 13,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 55,
  },
  signup: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  logoImg: {
    width: 100,
    height: 40,
    marginBottom: 80,
    position: "relative",
  },
  emailField: {
    backgroundColor: "#edeff2",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 15,
  },
  nameField: {
    marginBottom: 15,
    backgroundColor: "#edeff2",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  passwordField: {
    backgroundColor: "#edeff2",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: "800",
  },
});

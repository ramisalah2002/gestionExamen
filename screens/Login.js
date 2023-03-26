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
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../src/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../src/context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [iconName, setIconName] = useState("eye");

  const isDisabled = !(email.length > 0 && password.length > 0);
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const handleLogin = () => {
    setError("");
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
          const nom = data.etudiant.nom;
          const prenom = data.etudiant.prenom;
          const etudiantId = data.etudiant.id;
          const etudiantEmail = data.etudiant.email;
          const etudiantPassword = data.etudiant.password;
          const etudiantFiliereId = data.etudiant.filiere_id;
          
          signIn({ token: token, name: `${prenom} ${nom}`, etudiantId: etudiantId, etudiantEmail: etudiantEmail ,etudiantPassword : etudiantPassword,etudiantFiliereId : etudiantFiliereId});

          console.log("success");
          navigation.navigate("HomeScreen");
        } else {
          setError(data.error || "Erreur inconnue");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong");
      });
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigation.navigate("HomeScreen");
    }
  }, [user]);

  const handlePressSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.loginContainer}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                style={styles.iconBack}
                name="arrowleft"
                size={30}
                color="#3d394e"
              />
            </TouchableOpacity>
          </View>
          <Image source={require("../images/login.jpg")} style={styles.image} />
          <View style={{ width: "100%", marginBottom: 15 }}>
            <Text style={{ fontSize: 30, fontWeight: "900" }}>Connexion</Text>
          </View>
          <View style={styles.emailField}>
            <AntDesign
              style={styles.icon}
              name="mail"
              size={24}
              color="#3d394e"
            />
            <TextInput
              selectionColor="#000"
              placeholder="Email"
              placeholderTextColor="#bbbcc0"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.passwordField}>
            <AntDesign
              style={styles.icon}
              name="lock1"
              size={26}
              color="#3d394e"
            />
            <TextInput
              selectionColor="#000"
              placeholder="Mot de passe"
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
                color="#000"
                name={showPassword ? "eye-slash" : "eye"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            disabled={isDisabled}
          >
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Vous n'avez pas de compte?</Text>
            <TouchableOpacity onPress={handlePressSignup}>
              <Text
                style={{ fontSize: 18, fontWeight: "900", color: "#302ea6" }}
              >
                {" "}
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={styles.errorMessage}>
              Email ou mot de passe erroné
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#dde6f2",
  },
  content: {
    width: "95%",
  },
  iconBack: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  loginContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  choiceImage: {
    alignItems: "center",
  },
  choiceText: {
    marginTop: 5,
    fontSize: 16,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#48bee6",
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
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: "80%",
  },
  passwordStrengthContainer: {
    width: "100%",
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
    marginTop: 5,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "flex-start",
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
    marginTop: 5,
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
    backgroundColor: "#302ea6",
    padding: 13,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 55,
  },
  signup: {
    marginTop: 5,
    flexDirection: "row",
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
    backgroundColor: "#fefefe",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#000",
    marginBottom: 10,
  },

  passwordField: {
    backgroundColor: "#fefefe",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "#000",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});

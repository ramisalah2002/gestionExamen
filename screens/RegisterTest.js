import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../src/context/AuthContext";
import axios from "axios";


const RegisterTestScreen = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [filiere_id, setFiliere_id] = useState("");

  const handleRegister = (
    nom,
    prenom,
    email,
    password,
    password_confirmation,
    filiere_id
  ) => {
    axios
      .post("http://10.0.2.2:8000/api/register", {
        nom,
        prenom,
        email,
        password,
        password_confirmation,
        filiere_id,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={(text) => setNom(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prenom"
        value={prenom}
        onChangeText={(text) => setPrenom(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={password_confirmation}
        onChangeText={(text) => setPassword_confirmation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="filiere_id"
        value={filiere_id}
        onChangeText={(text) => setFiliere_id(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRegister(
            nom,
            prenom,
            email,
            password,
            password_confirmation,
            filiere_id
          );
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: "80%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterTestScreen;

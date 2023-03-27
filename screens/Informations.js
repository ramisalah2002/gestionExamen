import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Switch,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../src/context/AuthContext";

export default function InformationsScreen({ navigation }) {
  const [editingField, setEditingField] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.nom + " " + user.prenom);
  const [firstName, setFirstName] = useState(user.prenom);
  const [lastName, setLastName] = useState(user.nom);
  const [email, setEmail] = useState(user.email);
  const [filiere, setFiliere] = useState("");
  const [filiere_id, setFiliereId] = useState(null);
  const [password, setPassword] = useState(user.password);
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [filieres, setFilieres] = useState([]);
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.filiere_id) {
      setFiliereId(user.filiere_id);
    }
  }, [user]);

  useEffect(() => {
    const fetchFilieres = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/filieres");
        const data = await response.json();
        setFilieres(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des filières:", error);
      }
    };

    fetchFilieres();
  }, []);

  useEffect(() => {
    if (filiere_id) {
      const fetchFiliereDetails = async () => {
        try {
          const response = await fetch(
            "http://10.0.2.2:8000/api/filieres/" + filiere_id
          );
          const data = await response.json();

          if (data && data.nom) {
            setFiliere(data.nom);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données de la filière:",
            error
          );
        }
      };

      fetchFiliereDetails();
    } 
  }, [filiere_id]);

  const renderField = (label, value, editable) => {
    if (editingField === label) {
      if (label === "Nom" || label === "Prénom") {
        return (
          <View>
            <Text style={styles.editingTitle}>Nom et Prénom</Text>
            <TextInput
              style={styles.editingTextInput}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="Prénom"
            />
            <TextInput
              style={styles.editingTextInput}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Nom"
            />
            <View style={styles.editingButtonsContainer}>
              <TouchableOpacity
                style={styles.editingButton}
                onPress={() => {
                  setEditingField("");
                }}
              >
                <Text style={styles.editingButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editingButton}
                onPress={async () => {
                  try {
                    setEditingField("");
                    setName(firstName + " " + lastName);
                    // Mettre à jour l'utilisateur dans la base de données
                    await updateUser({ nom: lastName, prenom: firstName });
                  } catch (error) {
                    console.error(
                      "Erreur lors de la mise à jour des informations utilisateur:",
                      error
                    );
                  }
                }}
              >
                <Text style={styles.editingButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      if (editingField === label) {
        if (label === "Password") {
          return (
            <View>
              <Text style={styles.editingTitle}>Changer le mot de passe</Text>
              <TextInput
                style={styles.editingTextInput}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                placeholder="Ancien mot de passe"
                secureTextEntry
              />
              <TextInput
                style={styles.editingTextInput}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                placeholder="Nouveau mot de passe"
                secureTextEntry
              />
              <TextInput
                style={styles.editingTextInput}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="Confirmer le mot de passe"
                secureTextEntry
              />
              <View style={styles.editingButtonsContainer}>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    setEditingField("");
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  <Text style={styles.editingButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    if (oldPassword === password) {
                      if (newPassword === confirmPassword) {
                        setPassword(newPassword);
                        setEditingField("");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      } else {
                        alert("Les mots de passe ne correspondent pas.");
                      }
                    } else {
                      alert("L'ancien mot de passe est incorrect.");
                    }
                  }}
                >
                  <Text style={styles.editingButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        if (label === "Email") {
          return (
            <View>
              <Text style={styles.editingTitle}>{label}</Text>
              <TextInput
                style={styles.editingTextInput}
                value={editingValue}
                onChangeText={(text) => setEditingValue(text)}
              />
              <View style={styles.editingButtonsContainer}>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    setEditingField("");
                    setEditingValue("");
                  }}
                >
                  <Text style={styles.editingButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    setEditingField("");
                    setEmail(editingValue);
                    updateUser({ email: editingValue });
                  }}
                >
                  <Text style={styles.editingButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        if (label === "Filiere") {
          return (
            <View>
              <Text style={styles.editingTitle}>Filiere</Text>
              <Picker
                style={styles.editingTextInput}
                selectedValue={editingValue}
                onValueChange={(itemValue, itemIndex) =>
                  setEditingValue(itemValue)
                }
              >
                {filieres.map((filiere) => (
                  <Picker.Item
                    key={filiere.id}
                    label={filiere.nom}
                    value={filiere.id}
                  />
                ))}
              </Picker>

              <View style={styles.editingButtonsContainer}>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    setEditingField("");
                  }}
                >
                  <Text style={styles.editingButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editingButton}
                  onPress={() => {
                    setEditingField("");
                    setFiliereId(editingValue);
                    updateUser({ filiere_id: editingValue });
                  }}
                >
                  <Text style={styles.editingButtonText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        } else {
          // ... autres cas ...
        }
      } else {
      }
      return (
        <View>
          <Text style={styles.editingTitle}>{label}</Text>
          <TextInput
            style={styles.editingTextInput}
            value={editingValue}
            onChangeText={(text) => setEditingValue(text)}
          />
          <View style={styles.editingButtonsContainer}>
            <TouchableOpacity
              style={styles.editingButton}
              onPress={() => {
                setEditingField("");
                setEditingValue("");
              }}
            >
              <Text style={styles.editingButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editingButton}
              onPress={() => {
                setEditingField("");
                switch (label) {
                  case "Nom Complet":
                    setName(editingValue);
                    break;
                  case "Email":
                    setEmail(editingValue);
                    break;
                  case "Filiere":
                    setFiliere(editingValue);
                    break;
                  case "Password":
                    setPassword(editingValue);
                    break;
                }
              }}
            >
              <Text style={styles.editingButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>{label}</Text>
          <Text style={styles.informationText}>{value}</Text>
          {editable && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditingField(label);
                setEditingValue(value);
              }}
            >
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
          )}
          <View style={styles.horizontalLine} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />
        <View style={styles.titleContainer}>
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
          <Text style={styles.titleText}>Vos Informations</Text>
          <Text style={styles.secondText}>
            Vous trouverez dans cette page vos informations personnelles{" "}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/Informations.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.informationsContainer}>
          {renderField("Nom", firstName + " " + lastName, true)}
          {renderField("Email", email, true)}
          {renderField("Filiere", filiere, true)}
          {renderField("Password", "••••••••", true)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ef1f3",
    margin: 5,
    marginBottom: 0,
    marginTop: 0,
  },
  titleText: {
    marginTop: 15,
    marginLeft: 8,
    fontSize: 35,
    fontWeight: "bold",
    color: "#302ea6",
  },
  secondText: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 8,
    // fontWeight: "bold",
    color: "grey",
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 10,
    alignItems: "flex-start",
    width: "95%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  informationsContainer: {
    flexDirection: "column",
    margin: 5,
    marginTop: 0,
    backgroundColor: "#ffff",
    borderRadius: 10,
    shadowColor: "#111952",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  informationContainer: {
    padding: 10,
  },
  informationTitle: {
    color: "#263e4d",
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  informationText: {
    color: "#525b68",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 5,
  },
  horizontalLine: {
    height: 1.7,
    backgroundColor: "#f7f7f7",
    marginTop: 25,
    marginBottom: -5,
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7",
    marginHorizontal: -25,
    width: "116%",
  },
  editButton: {
    backgroundColor: "#2e6af7",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: -20,
  },
  editButtonText: {
    color: "#ffff",
    fontWeight: "bold",
  },
  editingTitle: {
    color: "#263e4d",
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7",
  },
  editingTextInput: {
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  editingButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editingButton: {
    backgroundColor: "#2e6af7",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  editingButtonText: {
    color: "#ffff",
    fontWeight: "bold",
  },
  image: {
    width: "70%",
    height: 170,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 30,
  },
});

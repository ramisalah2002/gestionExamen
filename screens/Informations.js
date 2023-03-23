import { StatusBar } from "expo-status-bar";
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
import { Picker } from "@react-native-picker/picker";

export default function InformationsScreen({ navigation }) {
  const [editingField, setEditingField] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [name, setName] = useState("Laawamir Anass");
  const [firstName, setFirstName] = useState("Laawamir");
  const [lastName, setLastName] = useState("Anass");
  const [email, setEmail] = useState("Dasisko@gmail.com");
  const [filiere, setFiliere] = useState("Génie Logiciel");
  const [password, setPassword] = useState("123");
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
                onPress={() => {
                  setEditingField("");
                  setName(firstName + " " + lastName);
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
                <Picker.Item label="Génie Logiciel" value="Génie Logiciel" />
                <Picker.Item label="Informatique" value="Informatique" />
                <Picker.Item
                  label="Réseaux et Télécommunications"
                  value="Réseaux et Télécommunications"
                />
                <Picker.Item label="Génie Civil" value="Génie Civil" />
                {/* Ajoutez d'autres filières si nécessaire */}
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
                    setFiliere(editingValue);
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
    margin: 10,
    marginTop: 0,
    backgroundColor: "#ffff",
    borderRadius: 15,
    shadowColor: "#111952",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 7,
    padding: 15,
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
    width: "116.5%",
  },
  editButton: {
    backgroundColor: "#2e6af7",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    justifyContent: "flex-end",
  },
  editingButton: {
    backgroundColor: "#2e6af7",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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

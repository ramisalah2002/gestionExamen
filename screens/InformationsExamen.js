import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import axios from "axios";
import { CheckBox } from "react-native-elements";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function passerExamScreen({ navigation }) {
  const [matiere, setMatiere] = useState("Programmation Java");
  const [duree, setDuree] = useState("2h 30min");
  const [dateExamen, setDateExamen] = useState("2023-03-21T03:24:00.000Z");

  const [tempsRestant, setTempsRestant] = useState(0);
  const [timerTerminé, setTimerTerminé] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const diff = Date.parse(dateExamen) - now;

      const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
      const heures = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((diff % (1000 * 60)) / 1000);

      setTempsRestant(`${jours}jr ${heures}h ${minutes}min ${secondes}s`);

      if (diff <= 0) {
        setTimerTerminé(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dateExamen]);

  const handlePasserExamen = () => {
    // Naviguer vers la page passerExamen pour cet examen
    navigation.navigate("passerExamen", { matiere, duree, dateExamen });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={30}
            color="white"
          />
          <Text style={styles.headerText}>RAMI Salah-eddine</Text>
        </View>
        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text style={styles.titleTop}>Examen : Java</Text>
        </View>
      </View>
      <ScrollView>
        <View View style={styles.body}>
          <View style={styles.examInfo}>
            <Text style={styles.examInfoTitle}>Matière de l'examen:</Text>
            <Text style={styles.examInfoText}>{matiere}</Text>
          </View>
          <View style={styles.examInfo}>
            <Text style={styles.examInfoTitle}>Durée de l'examen:</Text>
            <Text style={styles.examInfoText}>{duree}</Text>
          </View>
          <View style={styles.examInfo}>
            <Text style={styles.examInfoTitle}>Date d 'examen:</Text>
            <Text style={styles.examInfoText}>
              {new Date( dateExamen)
                .toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "/")}
              {` à ${new Date(dateExamen).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </Text>
          </View>
          <View style={styles.examInfo}>
            <Text style={styles.examInfoTitle}>Temps restant:</Text>
            <Text style={styles.examInfoText}>{tempsRestant}</Text>
          </View>
          <View style={styles.examInfo}>
            <Text style={styles.examInfoTitle}>Description de l'examen:</Text>
            <Text style={styles.examInfoText}>
              [Description indisponible pour cet examen]
            </Text>
            {timerTerminé && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePasserExamen}
              >
                <Text style={styles.submitButtonText}>
                  Passer l'examen
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  titleTop: {
    marginLeft: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  textTop: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 17,
    color: "#c8ceed",
  },
  countdownTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerFilter: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5554b7",
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    width: "14%",
    marginBottom: 30,
  },
  topIcons: {
    
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "4%",
    width: "92%",
    justifyContent: "space-between",
  },
  header: {
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#302ea6",
    height: 200,
    width: "100%",
  },
  body: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  examInfo: {
    marginBottom: 20,
  },
  examInfoTitle: {
    color: "#302ea6",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  examInfoText: {
    fontSize: 16,
  },
  passerExamenButton: {
    backgroundColor: "#302ea6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 120,
    alignSelf: "center",
  },
  passerExamenButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: '#302ea6',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    width:'100%',
    marginTop: 120,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import ExamCorrectionScreen from "./ExamCorrection";
import { AuthContext } from "../src/context/AuthContext";

export default function ExamCorrectionList({ navigation }) {
  // const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);
  const [etudiantId, setEtudiantId] = useState(user.id);
  const [examenId, setExamenId] = useState("100");
  const { authToken } = useContext(AuthContext);
  const [resultats, setResultats] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleIconClick = (index) => {
    if (selectedQuestionIndex === index) {
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(index);
    }
  };
  useEffect(() => {
    const fetchResultats = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/api/etudiant/${etudiantId}/examen/${examenId}/resultats`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        setResultats(data.resultats);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchResultats();
  }, [etudiantId, examenId, authToken]);

  // useEffect(() => {
  //   axios
  //     .get("Mon url")
  //     .then((response) => {
  //       setData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // Changes that I need to do
  // reponse à changé par reponse
  // correction à changé par correction
  // reponse à changé par reponse
  // id à changé par numéro seulement dans <Text style={styles.question}>Question {item.id}</Text>
  // Quelque nom de variable pour que le code soit plus clair

  return (
    <View>
      {resultats.map((resultat, index) => {
        const isCorrect =
          resultat.reponse_etudiant === resultat.proposition_correcte;
        return (
          <View key={index}>
            <View key={index} style={styles.questionContainer}>
              <TouchableOpacity onPress={() => handleIconClick(index)}>
                <AntDesign
                  style={styles.icon}
                  name="right"
                  size={35}
                  color="black"
                />
              </TouchableOpacity>
              <View style={styles.correction}>
                <Text style={styles.question}>{resultat.question}</Text>
                <Text style={styles.espace}> </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: isCorrect ? "#5ee093" : "#f14746",
                  }}
                >
                  {" "}
                  {resultat.reponse_etudiant === resultat.proposition_correcte
                    ? "Correct"
                    : "Incorrect"}
                </Text>

                {selectedQuestionIndex === index && (
                  <>
                    <Text style={styles.studentAnswer}>
                      Reponse Etudiant: {resultat.reponse_etudiant}
                    </Text>
                    <Text style={styles.correctAnswer}>
                      Proposition Correcte: {resultat.proposition_correcte}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.horizontaleLine} />
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    backgroundColor: "#302ead",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 15,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  note: {
    backgroundColor: "#5ee093",
    height: 75,
    width: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noteText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFF",
  },
  leftBox: {
    marginLeft: 15,
  },
  leftTextFirst: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFF",
  },
  leftTextSecond: {
    fontSize: 12,
    color: "#FFFF",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "12%",
    backgroundColor: "#FFFF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 25,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 2, // for Android only
  },
  bodyFirstText: {
    color: "#1a1c20",
  },
  bodySecondText: {
    fontSize: 20,
    color: "#59626f",
  },
  verticalLine: {
    borderLeftWidth: 1.5,
    borderLeftColor: "#eeeeee",
    height: 50,
  },
  espace: {
    height: 10,
  },
  innerContainer: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#66707c",
  },
  correction: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
  },
  answerTrue: {
    fontSize: 12,
    color: "#5ee093",
    fontWeight: "bold",
  },
  answerFalse: {
    fontSize: 12,
    color: "#f14746",
    fontWeight: "bold",
  },
  horizontaleLine: {
    borderBottomWidth: 1.7,
    borderBottomColor: "#eeee",
  },
  studentAnswer: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1c20",
    marginTop: 5,
  },
  correctAnswer: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1c20",
    marginTop: 5,
  },
});

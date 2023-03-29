import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import ExamCorrectionScreen from "./ExamCorrection";
import { AuthContext } from "../src/context/AuthContext";

export default function QuestionsList({ navigation }) {
  // const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);
  const [etudiantId, setEtudiantId] = useState(user.id);
  // const [examenId, setExamenId] = useState("100");
  const { authToken } = useContext(AuthContext);
  const [resultats, setResultats] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [examenId, setExamenId] = useState(navigation.getParam("examenId"));
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

  return (
    <View>
      {resultats.map((resultat, index) => {
        const isCorrect = resultat.est_correct;
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
                  {resultat.est_correct ? "Correct" : "Incorrect"}
                </Text>

                {selectedQuestionIndex === index && (
                  <>
                    <Text style={styles.studentAnswer}>
                      Votre Reponse : {resultat.reponse_etudiant}
                    </Text>
                    <Text style={styles.correctAnswer}>
                      Proposition correcte: {resultat.proposition_correcte}
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
  
  note: {
    backgroundColor: "#5ee093",
    color: "#FFFF",
    height: 75,
    width: 75,
    borderRadius: 10,
    marginLeft: "4%",
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
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
  noteText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFF",
  },
  leftBox: {
    height: 75,
    borderRadius: 10,
    marginLeft: "2%",
    paddingRight: "22%",
    justifyContent: "center", // center vertically
    alignItems: "flex-start", // center horizontally
  },
  body: {
    backgroundColor: "#FFFF",
    resizeMode: "contain",
    height: "12%",
    width: "100%",
    minWidth: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 2, // for Android only
  },
  bodyLeft: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginLeft: "20%",
  },
  bodyRight: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginRight: "20%",
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
    backgroundColor: "transparent",
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

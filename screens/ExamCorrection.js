import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Touchable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AuthContext } from "../src/context/AuthContext";

export default function ExamCorrectionScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [etudiantId, setEtudiantId] = useState(user.id);
  // const [examenId, setExamenId] = useState("100");
  const { authToken } = useContext(AuthContext);
  const [resultats, setResultats] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [examenId, setExamenId] = useState(navigation.getParam("examenId"));
  const [examenNom, setExamenNom] = useState(navigation.getParam("examenNom"));
  const [examenDate, setExamenDate] = useState(
    navigation.getParam("examenDate")
  );
  const [nombreQuestion, setNombreQuestion] = useState("");
  const [reponsesCorrectes, setReponsesCorrectes] = useState("");
  const [reponsesIncorrectes, setReponsesIncorrectes] = useState("");

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

        // Obtenir le nombre de réponses correctes
        const reponsesCorrectes = data.resultats.filter(
          (result) => result.est_correct
        );
        const nombreReponsesCorrectes = reponsesCorrectes.length;

        // Obtenir le nombre de réponses incorrectes
        const reponsesIncorrectes = data.resultats.filter(
          (result) => !result.est_correct
        );
        const nombreReponsesIncorrectes = reponsesIncorrectes.length;

        setNombreQuestion(data.resultats.length);
        setReponsesCorrectes(nombreReponsesCorrectes);
        setReponsesIncorrectes(nombreReponsesIncorrectes);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
      }
    };

    fetchResultats();
  }, [etudiantId, examenId, authToken]);
  const pressHandlerClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={pressHandlerClose} style={styles.topIcons}>
          <AntDesign style={styles.icon} name="close" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.infoBox}>
          <View style={styles.note}>
            <Text style={styles.noteText}>{reponsesCorrectes}</Text>
          </View>
          <View style={styles.leftBox}>
            <Text style={styles.leftTextFirst}>
              {examenNom} ({examenDate})
            </Text>
            <Text style={styles.espace}> </Text>
            <Text style={styles.leftTextSecond}>
              Ecole Supérieur de technologis Salé - UM5
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body} resizeMode="cover">
        <View style={styles.bodyLeft}>
          <Text style={styles.bodyFirstText}>Correct</Text>
          <Text style={styles.espace}> </Text>
          <Text style={styles.bodySecondText}>
            {reponsesCorrectes}/{nombreQuestion}
          </Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.bodyRight}>
          <Text style={styles.bodyFirstText}>Wrong</Text>
          <Text style={styles.espace}> </Text>
          <Text style={styles.bodySecondText}>
            {reponsesIncorrectes}/{nombreQuestion}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Liste des Questions</Text>
          <Text style={styles.espace}> </Text>
          <View>
            {resultats.map((resultat, index) => {
              const isCorrect = resultat.est_correct;
              return (
                <View key={index}>
                  <View key={index} style={styles.questionContainer}>
                    <TouchableOpacity onPress={() => handleIconClick(index)}>
                      <AntDesign
                        style={styles.icon}
                        name={
                          selectedQuestionIndex === index ? "down" : "right"
                        }
                        size={20}
                        color="black"
                      />
                    </TouchableOpacity>
                    <View style={styles.correction}>
                      <Text style={styles.question}>{resultat.question}</Text>
                      <Text style={styles.espace}> </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          marginTop: -6,
                          marginLeft: -4,
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
                            Correction: {resultat.proposition_correcte}
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  questionContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoBox: {
    flexDirection: "row",
    paddingVertical: 20,
    //marginTop:10,
  },
  topIcons: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "4%",
    width: "92%",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#302ead",
    width: "100%",
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flexDirection: "column",
  },
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

import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Touchable,
} from "react-native";
import ExamsList from "./ExamsList";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecentExamsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [examens, setExamens] = useState([]);
  const pressHandlerClose = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/api/etudiants/${user.id}/examens-passes`
        );
        const data = await response.json();
        const examensArray = Object.keys(data.examens).flatMap((matiere) =>
          data.examens[matiere].map((examen) => ({
            id: examen.id,
            date: examen.date,
            nom: matiere,
            date: examen.date,
          }))
        );
        setExamens(examensArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens:", error);
      }
    };

    fetchExamens();
  }, [user.id]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={pressHandlerClose}>
            <AntDesign
              style={styles.icon}
              name="arrowleft"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, color: "#fff" }}>{user.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.leftBox}>
            <Text style={styles.leftTextFirst}>
              Examens passés ( {examens.length} )
            </Text>
            <Text style={styles.espace}> </Text>
            <Text style={styles.leftTextSecond}>
              Ecole Supérieur de technologis Salé - UM5
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Liste des examens passés</Text>
          <Text style={styles.espace}> </Text>
          {examens.map((examen, index) => (
            <View key={index} style={styles.questionsContainer}>
              <View style={styles.questionContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExamCorrectionScreen", {
                      examenId: examen.id,
                      examenNom: examen.nom,
                      examenDate: examen.date,
                    })
                  }
                >
                  <AntDesign
                    style={styles.icon}
                    name="right"
                    size={35}
                    color="black"
                  />
                </TouchableOpacity>
                <View style={styles.correction}>
                  <Text style={styles.question}>{examen.nom}</Text>
                  <Text style={styles.espace}> </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#3c7da6",
                    }}
                  >
                    {examen.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
    padding: 5,
    justifyContent: "space-between",
  },
  questionsContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d0ecfe",
    backgroundColor: "#d0ecfe",
    borderRadius: 5,
    shadowColor: "#d0ecfe",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    marginBottom: 10,
    shadowRadius: 1.84,
    elevation: 1,
  },
  infoBox: {
    flexDirection: "row",
    paddingVertical: 20,
    marginLeft: "4%",
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
    backgroundColor: "#302ea6",
    width: "100%",
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flexDirection: "column",
  },

  leftTextFirst: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },
  leftTextSecond: {
    fontSize: 14,
    color: "#FFFF",
  },
  leftBox: {
    height: 75,
    borderRadius: 10,
    marginLeft: "2%",
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
    marginTop: 20,
    backgroundColor: "transparent",
    paddingHorizontal: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#66707c",
  },
  correction: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 18,
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
});

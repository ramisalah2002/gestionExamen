import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const ExamCorrectionList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Changes that I need to do
  // first-name à changé par reponse
  // last-name à changé par correction
  // first-name à changé par reponse
  // id à changé par numéro seulement dans <Text style={styles.question}>Question {item.id}</Text>
  // Quelque nom de variable pour que le code soit plus clair

  return (
    <View>
      {data.map((item) => {
        const isCorrect = item.first_name === item.last_name;
        return (
          <View key={item.id}>
            <View key={item.id} style={styles.questionContainer}>
              <TouchableOpacity>
                <AntDesign
                  style={styles.icon}
                  name="right"
                  size={35}
                  color="black"
                />
              </TouchableOpacity>
              <View style={styles.correction}>
                <Text style={styles.question}>Question {item.id}</Text>
                <Text style={styles.espace}> </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: isCorrect ? "#5ee093" : "#f14746",
                  }}
                >
                  {" "}
                  {item.first_name === item.last_name
                    ? "Correct Answer"
                    : "Wrong Answer"}
                </Text>
              </View>
            </View>
            <View style={styles.horizontaleLine} />
          </View>
        );
      })}
    </View>
  );
};
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
    backgroundColor: "#46bee6",
    width: "100%",
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
  horizontaleLine: {
    borderBottomWidth: 1.7,
    borderBottomColor: "#eeee",
  },
});
export default ExamCorrectionList;

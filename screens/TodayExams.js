import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/context/AuthContext";
import moment from "moment";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//import CountdownTimer from './CountdownTimer';

const CountdownTimer = ({ time }) => {
  const [currentTime, setCurrentTime] = useState(time);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  const formatTime = (timeInSeconds) => {
    const pad = (num, size) => `0${num}`.slice(size * -1);
    const time = parseFloat(timeInSeconds).toFixed(3);
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);
    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
  };

  return (
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
      {formatTime(currentTime)}
    </Text>
  );
};

const getCurrentTimeInSeconds = () => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};
const Tab = createMaterialTopTabNavigator();

export default function TodayExamsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [upcomingExams, setUpcomingExams] = useState([]);

  useEffect(() => {
    fetch("http://10.0.2.2:8000/api/today-exams-filiere/1")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingExams(data);
        console.log("examens success");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={styles.icon}
              name="arrowleft"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, color: "#fff" }}>{user.name}</Text>
        </View>
        <Text style={styles.titleTop}>
          Examens à venir ( {upcomingExams.length} )
        </Text>
        <Text style={styles.textTop}>
          Ecole Supérieur de technologis Salé - UM5
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.passedContainer}>
        {upcomingExams.map((exam, index) => {
          const examTimeInSeconds = moment(
            `${exam.date}T${exam.heure}`,
            "YYYY-MM-DDTHH:mm:ss"
          ).diff(moment(), "seconds");
          const timeDiffInSeconds =
            examTimeInSeconds > 0 ? examTimeInSeconds : 0;

          let backgroundColor;
          if (timeDiffInSeconds <= 0) {
            backgroundColor = "blue";
          } else if (timeDiffInSeconds < 3600) {
            backgroundColor = "lightcoral";
          } else if (timeDiffInSeconds < 10800) {
            backgroundColor = "orange";
          } else {
            backgroundColor = "lightgreen";
          }
          return (
            <View style={styles.row} key={index}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "100%" }}>
                  <Text style={styles.name}>
                    <Text style={styles.subject}>{exam.matiere_nom}</Text>
                  </Text>
                  <Text style={styles.date}>
                    {exam.date} {exam.heure}
                  </Text>
                </View>
                {timeDiffInSeconds > 0 ? (
                  <View style={[styles.todayCircle, { backgroundColor }]}>
                    <CountdownTimer time={timeDiffInSeconds} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("passerExamScreen", {
                        examId: exam.id,
                        examMatiere: exam.matiere_nom,
                        etudiantName: user.name,
                      })
                    }
                    style={[styles.todayCircle, { backgroundColor: "#48bee6" }]}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Passer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  passedContainer: {
    paddingHorizontal: 5,
    paddingBottom: 16,
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  row: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#FFF",
    borderBottomColor: "#eeeeee",
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#111952",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "baseline",
  },
  subject: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#302ea6",
  },
  date: {
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F6FEFF",
    width: "100%",
    justifyContent: "center",
  },
  circle: {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: {
    borderRadius: 5,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "white",
    flex: 1,
  },
  titleTop: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  textTop: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 14,
    color: "#FFFF",
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 25,
    paddingBottom: 30,
    marginBottom: 10,
    backgroundColor: "#302ea6",
    width: "100%",
  },
});

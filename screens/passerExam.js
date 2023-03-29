import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import axios from "axios";
import {CheckBox} from "react-native-elements";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";


export default function passerExam() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/examens/1');
        const examData = await response.json();
        setExamData(examData);
        const duration = parseInt(examData.duree) * 60 * 1000;
        setRemainingTime(duration)
        console.log(duration);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExam();
  }, []);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  

  

  const handleAnswerPress = (propositionId) => {
    setSelectedAnswer(propositionId);
  }

  useEffect(() => {
    console.log(selectedAnswer);
  }, [selectedAnswer]);


  


  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 60 * 1000); // Decrease remaining time by 1 minute
    }, 60 * 1000); // Update every minute

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, []);

  const hourNumber = Math.floor(remainingTime / (60 * 60 * 1000));
  const minuteNumber = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const [numAnswered, setNumAnswered] = useState(0);
  let zero = "";
  if(minuteNumber<10){
    zero = "0";
  }else{
    zero = "";
  }

  

  

  const handleContinuePress = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const response = {
        etudiant_id: 330,
        question_id: currentQuestion.id,
        proposition_id: selectedAnswer,
      };
  
      fetch('http://10.0.2.2:8000/api/reponses/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while submitting your response.');
        });
    }else{
      const response = {
        etudiant_id: 330,
        question_id: currentQuestion.id,
        proposition_id: selectedAnswer,
      };
  
      fetch('http://10.0.2.2:8000/api/reponses/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while submitting your response.');
        });
    }
  }

  if (!examData) {
    return (
      <View style={styles.container}>
        <Text>Loading exam data...</Text>
      </View>
    );
  }

  const currentQuestion = examData.questions[currentQuestionIndex];

  return (
    <View style={styles.Bigcontainer}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
      <View style={styles.topIcons}>
        <TouchableOpacity >
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{examData.questions.length}</Text>
      </View>
      <View style={{width:'100%',marginBottom:10}}>
        <Text style={styles.titleTop}>Examen : {examData.matiere.nom}</Text>
      </View>
      <View style={styles.headerTimer}>
          <View style={styles.headerScore}>
              <Text style={styles.itemTitle}>Question</Text>
              <View style={styles.itemScoreContainer}>
                <Text style={styles.scoreNumber}>N°{currentQuestionIndex+1}</Text>
              </View>
          </View>
          <View style={styles.headerCountdown}>
              <Text style={styles.itemTitle}>Temps restant</Text>
              <View style={styles.countdownTime}>
                  <View style={styles.itemHourContainer}>
                    <Text style={styles.HourNumber}>0{hourNumber}</Text>
                  </View>
                  <View style={styles.itemMinuteContainer}>
                    <Text style={styles.MinuteNumber}>{zero}{minuteNumber}</Text>
                  </View>
              </View>
          </View>
      </View>
    </View>
    <View style={[styles.infoContainer,{marginTop:10,paddingHorizontal: 20,}]}>
                <Text style={styles.bodyFirstText}>Informations sur l'examen</Text>
                <View style={[styles.info,{flexDirection:'row',alignItems:'center',}]}>
                    <View style={styles.itemQuestionsContainer}>
                        <Text style={styles.questionsNumber}>Questions</Text>
                        <Text style={styles.itemTitle}>{examData.questions.length}</Text>
                    </View>
                    <View style={styles.itemTimeContainer}>
                        <Text style={styles.questionsNumber}>Temps d'examen</Text>
                        <Text style={styles.itemTitle}>{examData.duree} minutes</Text>
                    </View>
                </View>
            </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.libelle} ?</Text>
      </View>
      <View style={styles.propositionsContainer}>
        {currentQuestion.propositions.map(proposition => (
          <TouchableOpacity
            key={proposition.id}
            style={[
              styles.propositionButton,
              selectedAnswer === proposition.id && styles.propositionButtonSelected,
            ]}
            onPress={() => handleAnswerPress(proposition.id)}
          >
            <Text style={styles.propositionButtonText}>{proposition.libelle}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedAnswer === null && styles.buttonDisabled,
          ]}
          disabled={selectedAnswer === null}
          onPress={handleContinuePress}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      {/* //// */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  Bigcontainer: {
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  titleTop: {
    marginLeft: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  boldInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color:'#0e0b1b',
    marginHorizontal:10,
  },
  regularInfo: {
    fontSize: 16,
    fontWeight: "regular",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#414149",
    marginBottom:5
  },
  scoreNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2b2780",
  },
  HourNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: "#2b2780",
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#121123",
  },
  MinuteNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: "#ff8645",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerScore: {
    alignItems:'center',
  },
  itemScoreContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:70,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionNumberContainer: {
    backgroundColor: '#dddcec',
    borderRadius: 5,
    width:50,
    height:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHourContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:10
  },
  itemMinuteContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTimeContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:'40%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemQuestionsContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:'40%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTimer: {
    fontWeight: "bold",
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:20,
    height:'50%',
    borderRadius:15,
    padding:20,
    width:'65%',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  info: {
    fontWeight: "bold",
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    justifyContent:'space-around',
    padding:10,
    
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
    marginTop: 80,
    marginBottom:20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "4%",
    width: "92%",
    justifyContent: "space-between",
  },
  header: {
    borderRadius: 25,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#302ea6",
    height:200,
    width: "100%",
  },
  body: {
    backgroundColor: "#f3f4f6",
    resizeMode: "contain",
    height: "12%",
    width: "100%",
    minWidth: "100%",
    justifyContent: "space-between",
  },
  bodyFirstText: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#13129e",
    height: 33,
  },
  submitButton: {
    backgroundColor: '#302ea6',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  modalConfirmButton: {
    backgroundColor: '#2196F3',
  },
  modalCancelButton: {
    backgroundColor: '#E91E63',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  examInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    margin: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  propositionsContainer: {
    margin: 20,
    width: '90%',
  },
  propositionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  propositionButtonSelected: {
    backgroundColor: '#0080ff',
  },
  propositionButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 10,
    borderRadius: 5,
    width: '90%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

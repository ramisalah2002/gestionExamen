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

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: [
      { id: 1, label: 'Paris', selected: false },
      { id: 2, label: 'Madrid', selected: false },
      { id: 3, label: 'Rome', selected: false },
      { id: 4, label: 'Berlin', selected: false },
    ],
  },
  {
    id: 2,
    question: 'What is the largest country by area?',
    options: [
      { id: 1, label: 'Russia', selected: false },
      { id: 2, label: 'China', selected: false },
      { id: 3, label: 'United States', selected: false },
      { id: 4, label: 'Canada', selected: false },
    ],
  },
  {
    id: 3,
    question: 'What is the capital of France?',
    options: [
      { id: 1, label: 'Paris', selected: false },
      { id: 2, label: 'Madrid', selected: false },
      { id: 3, label: 'Rome', selected: false },
      { id: 4, label: 'Berlin', selected: false },
    ],
  },
  {
    id: 4,
    question: 'What is the largest country by area?',
    options: [
      { id: 1, label: 'Russia', selected: false },
      { id: 2, label: 'China', selected: false },
      { id: 3, label: 'United States', selected: false },
      { id: 4, label: 'Canada', selected: false },
    ],
  },
  {
    id: 5,
    question: 'What is the capital of France?',
    options: [
      { id: 1, label: 'Paris', selected: false },
      { id: 2, label: 'Madrid', selected: false },
      { id: 3, label: 'Rome', selected: false },
      { id: 4, label: 'Berlin', selected: false },
    ],
  },
  {
    id: 6,
    question: 'What is the largest country by area?',
    options: [
      { id: 1, label: 'Russia', selected: false },
      { id: 2, label: 'China', selected: false },
      { id: 3, label: 'United States', selected: false },
      { id: 4, label: 'Canada', selected: false },
    ],
  },
  {
    id: 7,
    question: 'What is the capital of France?',
    options: [
      { id: 1, label: 'Paris', selected: false },
      { id: 2, label: 'Madrid', selected: false },
      { id: 3, label: 'Rome', selected: false },
      { id: 4, label: 'Berlin', selected: false },
    ],
  },
  {
    id: 8,
    question: 'What is the largest country by area?',
    options: [
      { id: 1, label: 'Russia', selected: false },
      { id: 2, label: 'China', selected: false },
      { id: 3, label: 'United States', selected: false },
      { id: 4, label: 'Canada', selected: false },
    ],
  },
];

const EXAM_DURATION = 2 * 60 * 60 * 1000; // Exam duration is 2 hours in milliseconds

export default function passerExamScreen({ navigation }) {

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isActive, setIsActive] = useState(true);
  
  const [remainingTime, setRemainingTime] = useState(EXAM_DURATION);

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

  
  const handleSelectAnswer = (questionId, optionId) => {
    const question = questions.find((q) => q.id === questionId);
    const option = question.options.find((o) => o.id === optionId);

    // If the option is already selected, deselect it
    if (option.selected) {
      option.selected = false;
      setSelectedAnswers((prevSelectedAnswers) =>
        prevSelectedAnswers.filter(
          (answer) => answer.questionId !== questionId
        )
      );
    } else {
      // Otherwise, select the new option and deselect the others
      question.options.forEach((o) => {
        if (o.id !== optionId) {
          o.selected = false;
        } else {
          o.selected = true;
        }
      });
      setSelectedAnswers((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        { questionId, optionId },
      ]);
    }
  };

  const handleSubmit = () => {
    console.log(selectedAnswers);
    setModalVisible(true)
    // Do something with the selected answers, such as grade the exam
  };

  const handleClear = () => {
    questions.forEach((q) => {
      q.options.forEach((o) => {
        o.selected = false;
      });
    });
    setSelectedAnswers([]);
  };

  // Count the number of answered questions
  useEffect(() => {
    const count = questions.reduce((total, question) => {
      const answer = selectedAnswers.find((a) => a.questionId === question.id);
      return answer ? total + 1 : total;
    }, 0);
    setNumAnswered(count);
  }, [selectedAnswers]);

  


  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // here we should save the submitted answers and go back to the precedent screen
    setModalVisible(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    // Handle cancel action
    setModalVisible(false);
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
        <View style={{width:'100%',marginBottom:10}}>
            <Text style={styles.titleTop}>Examen : Java</Text>
        </View>
        <View style={styles.headerTimer}>
            <View style={styles.headerScore}>
                <Text style={styles.itemTitle}>Score</Text>
                <View style={styles.itemScoreContainer}>
                  <Text style={styles.scoreNumber}>{numAnswered}</Text>
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
                        <Text style={styles.itemTitle}>{questions.length}</Text>
                    </View>
                    <View style={styles.itemTimeContainer}>
                        <Text style={styles.questionsNumber}>Temps d'examen</Text>
                        <Text style={styles.itemTitle}>02H00M</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
              <View style={[styles.questionsContainer,{marginTop:20,paddingHorizontal: 20,}]}>
              {questions.map((question) => (
                  <View key={question.id} style={styles.questContainer}>
                      <View style={[styles.questionTitle,{flexDirection:'column',alignItems:'flex-start',}]}>
                          <View style={{flexDirection:'row',alignItems:'center',}}>
                              <View style={styles.questionNumberContainer}>
                                <Text style={styles.questionNumber}>Q {question.id}</Text>
                              </View>
                              <Text style={styles.questionText}>{question.question}?</Text>
                          </View>
                          <View style={[styles.propositionsContainer,{flexDirection:'column',width:'100%',alignItems:'flex-start'}]}>
                          {question.options.map((option) => (
                            <CheckBox
                              key={option.id}
                              containerStyle={{ backgroundColor: "#f3f4f6", borderWidth: 0, padding: 0 }}
                              checked={option.selected}
                              checkedColor='#1dd1a1'
                              title={option.label}
                              textStyle={{ fontSize: 14 }}
                              onPress={() => handleSelectAnswer(question.id, option.id)}
                            />
                          ))}
                          </View>
                      </View>
                  </View>
                  ))}
                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Finish The Exam</Text>
                  </TouchableOpacity>
              </View>
            </ScrollView>
            <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmer la soumission</Text>
            <Text style={styles.modalText}>
            Êtes-vous sûr de vouloir soumettre vos réponses?
            </Text>
            <View style={styles.modalButtonContainer}>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width:'100%',
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
});

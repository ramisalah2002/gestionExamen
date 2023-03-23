import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

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
];

const qcmTest = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [numAnswered, setNumAnswered] = useState(0);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {numAnswered} of {questions.length} questions answered
        </Text>
      </View>
        <ScrollView style={styles.container}>
          <Text style={styles.answeredCount}>{numAnswered} answered</Text>
          {questions.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {question.id}- {question.question}
              </Text>
              {question.options.map((option) => (
                <CheckBox
                  key={option.id}
                  containerStyle={{ backgroundColor: "#f9f9f9", borderWidth: 0, padding: 0 }}
                  checked={option.selected}
                  title={option.label}
                  textStyle={{ fontSize: 14 }}
                  onPress={() => handleSelectAnswer(question.id, option.id)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
    width:'100%'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    width:'100%'
  },
  questionContainer: {
  marginBottom: 20,
  },
  questionText: {
    width:'100%',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    backgroundColor:'#f9f9f9',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#48bee6',
  },
  optionText: {
    fontSize: 14,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#48bee6',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom:-70,
    width:'100%',
  },
  quitButton: {
    backgroundColor: '#e6848b',
    borderRadius: 5,
    marginVertical: 80,
    alignItems: 'center',
    paddingVertical: 15,
    width:'100%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default qcmTest;
 

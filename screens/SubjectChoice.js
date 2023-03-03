// import {ScrollView, Switch, TextInput, Button, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
// import { NativeWindStyleSheet } from 'nativewind';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import React, { useState } from 'react';

// const subjects = ['Math', 'PC', 'Science', 'Info', 'Java', 'C language'];

// export default function SubjectChoiceScreen() {
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   function toggleSubjectSelection(subject) {
//     if (selectedSubjects.includes(subject)) {
//       setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
//     } else {
//         console.log(subject);
//       setSelectedSubjects([...selectedSubjects, subject]);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Select your subjects</Text>
//       <View style={styles.checkboxContainer}>
//         {subjects.map((subject) => (
//           <TouchableOpacity
//             key={subject}
//             style={[
//               styles.checkbox,
//               selectedSubjects.includes(subject) && styles.checkboxSelected,
//             ]}
//             onPress={() => toggleSubjectSelection(subject)}
//           >
//             <Text style={[styles.checkboxLabel, selectedSubjects.includes(subject) && styles.selectedCheckboxLabel]}>
//               {subject}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       {/* <Text style={styles.selectedSubjectsHeading}>Selected subjects:</Text>
//       <View style={styles.selectedSubjectsContainer}>
        
//         {selectedSubjects.map((subject) => (
//           <Text key={subject} style={styles.selectedSubject}>
//             {subject}
//           </Text>
//         ))}
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     backgroundColor: '#f7f7f7',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 30,
//     marginBottom: 20,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   checkbox: {
//     width: '49%',
//     marginVertical: 3,
//     paddingVertical: 10,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: '#dcdcdc',
//     backgroundColor: '#ffffff',
//   },
//   checkboxSelected: {
//     borderColor: '#007aff',
//     backgroundColor: '#007aff',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   selectedCheckboxLabel: {
//     color: '#ffffff',
//   },
//   selectedSubjectsContainer: {
//     marginTop: 30,
//   },
//   selectedSubjectsHeading: {
//     flexDirection:'row',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   selectedSubject: {
//     backgroundColor: '#007aff',
//     borderRadius: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginVertical: 5,
//   },
//   selectedSubjectLabel: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

const SubjectCoiceScreen = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleSelectAnswer = (questionId, optionId,option) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = prevSelectedAnswers.filter(
        (answer) => answer.questionId !== questionId
      );
      const question = questions.find((q) => q.id === questionId);
      const option = question.options.find((o) => o.id === optionId);
      question.options.forEach((o) => {
        if (o.id !== optionId) {
          o.selected = false;
        } else {
          o.selected = true;
        }
      });
      return [...newSelectedAnswers, { questionId, optionId }];
    });
    console.log('Q:'+questionId+'=>'+option);
  };

  const handleSubmit = () => {
    console.log(selectedAnswers);
    // Do something with the selected answers, such as grade the exam
  };


  const FooterButton = ({ onPress }) => (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
      <Text style={styles.footerButtonText}>Submit</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.id}- {question.question}</Text>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionContainer,
                option.selected
              ]}
              onPress={() => handleSelectAnswer(question.id, option.id,option.label)}
            >
              <View
                style={[
                  styles.checkbox,
                  option.selected && styles.selectedCheckbox,
                ]}
              >
                {option.selected && (
                  <View style={styles.selectedCheckboxInner} />
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  option.selected && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width:'100%',
    backgroundColor:'#f6f6f6',
  },
  questionContainer: {
    width:'100%',
    borderRadius: 10,
    padding: 10,
    marginBottom:10,
    backgroundColor:'white',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor:'#ededfb',
    padding:10,
    borderRadius:5,
    marginVertical:5,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4b72b6',
    marginRight: 10,
  },
  selectedCheckbox: {
    backgroundColor: '#4b72b6',
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5ec4dc',
    padding: 10,
    borderRadius: 5,
    marginBottom:20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

  export default SubjectCoiceScreen;
 

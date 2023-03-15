import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function passedExamScreen({navigation}) {
  const [exams, setExams] = useState([
    { id: '1', title: 'DBA', mark: '16', date: '13-03-2023' },
    { id: '2', title: 'PLSQL', mark: '14', date: '13-03-2023' },
    { id: '3', title: 'PAVA', mark: '17', date: '16-03-2023' },
    { id: '4', title: 'MTP', mark: '15', date: '16-03-2023' },
  ]);

  const actualdate = moment().format('Do MMMM YYYY');
// Display the current date in alphabets
  const today = new Date();
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString();
const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'alphabetic', day: 'numeric', year: 'numeric' });
  };

  const renderExam = ({ item }) => (
    <View style={styles.examContainer}>
      <Text style={styles.examTitle}>{item.title}</Text>
      <View style={styles.examDetailsContainer}>
        <Text style={styles.examMark}>{item.mark}/20</Text>
        <Text style={styles.examDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreButtonText}>See More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.profileDate}>{actualdate}</Text>
      <View style={styles.profileSection}>
          <Text style={styles.profileName}>Hey! RAMI Salah-eddine</Text>
          <Image source={ require('../images/salah.jpg') } style={styles.profileImage} />
      </View>
      <Text style={styles.passedTitle}>Examens passés</Text>
      <FlatList
        data={exams}
        renderItem={renderExam}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6FEFF',
    paddingVertical: 30,
    width:'100%',
    justifyContent:'center',

  },
  profileDate: {
    marginTop:40,
    marginHorizontal:10,
    
  },
  profileSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop:-20,
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal:10,
  },
  passedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:10,
    marginTop:10,
    color:'#1982C4',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  examContainer: {
    marginVertical: 8,
    marginHorizontal:5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor:'#48bee6',
    borderWidth:1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  examDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  examMark: {
    fontSize: 16,
    color: '#666',
  },
  examDate: {
    fontSize: 18,
    color: '#999',
  },
  seeMoreButton: {
    backgroundColor: '#48bee6',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  seeMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
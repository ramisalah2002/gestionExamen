import React, { useState } from 'react';
import moment from 'moment';
import { View, Text,Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { AntDesign } from '@expo/vector-icons';
import passedExamScreen from './passedExam';

export default function dashboardScreen({navigation}) {
// Get current date and format it in alphabets using moment.js
  const actualdate = moment().format('Do MMMM YYYY');
// Display the current date in alphabets
  const today = new Date();
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString();

  const todayExams = [
    { subject: 'Math', date: currentDate },
    { subject: 'Science', date: currentDate },
    { subject: 'English', date: currentDate },
  ];
  const upcomingExams = [
    { subject: 'Math', date: new Date(2023, 3, 10) },
    { subject: 'Science', date: new Date(2023, 3, 12) },
    { subject: 'English', date: new Date(2023, 3, 15) },
  ];
  const passedExams = [
    { subject: 'History', date: new Date(2023, 2, 27), score: '14/20' },
    { subject: 'Biology', date: new Date(2023, 2, 31), score: '16/20' },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'alphabetic', day: 'numeric', year: 'numeric' });
  };

  const handlePressPassed = () => {
    navigation.navigate('passedExamScreen');
  };

 
 
  return (
    <View style={styles.container}>
    <Text style={styles.profileDate}>{actualdate}</Text>
      <View style={styles.profileSection}>
          <Text style={styles.profileName}>Hey! RAMI Salah-eddine</Text>
          <Image source={ require('../images/salah.jpg') } style={styles.profileImage} />
      </View>
      <ScrollView>
        <View style={styles.personalSection}>
              <Text style={styles.sectionTitle1}>Informations personnelles</Text>
              <Image source={ require('../images/personalInfo.png') } style={styles.personalImage}/>
        </View>
        <View style={styles.todayExamsSection}>
          <View style={styles.todayExamsSection1}>
              <View style={styles.todayTitles}>
                <Text style={styles.todayNumber}>2</Text>
                <Text style={styles.sectionTitle2}>Examens d’aujourd’hui</Text>
              </View>
              <Image source={ require('../images/todayExams.png') } style={styles.todayImage}/>
          </View>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity style={styles.seeMore}>
            <Text style={styles.seeMoreTitle}>Voir Plus</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.todayExamsSection}>
          <View style={styles.todayExamsSection1}>
              <View style={styles.todayTitles}>
                <Text style={styles.upcomingNumber}>4</Text>
                <Text style={styles.upcomingTitle}>Examens à venir</Text>
              </View>
              <Image source={ require('../images/upcomingExams.png') } style={styles.todayImage}/>
          </View>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity style={styles.seeMore}>
            <Text style={styles.seeMoreTitle}>Voir Plus</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.todayExamsSection}>
          <View style={styles.todayExamsSection1}>
              <View style={styles.todayTitles}>
                <Text style={styles.passedNumber}>3</Text>
                <Text style={styles.passedTitle}>Examens passés</Text>
              </View>
              <Image source={ require('../images/passedExams.png') } style={styles.passedImage}/>
          </View>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity onPress={handlePressPassed} style={styles.seeMore}>
            <Text style={styles.seeMoreTitle}>Voir Plus</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        
        
        {/* <View
          style={styles.section}
          > */}
          {/* <Text style={styles.sectionTitle}>Exam Dates</Text> */}
        {/* <View style={styles.expandedSection}> */}
          {/* <View style={styles.todaySection}>
            <Text style={styles.subSectionTitle}>Today Exams</Text>
            {todayExams.map((exam, index) => (
              <View key={index} style={styles.item}>
                <Text>{exam.subject}:</Text>
                <Text>14:30</Text>
              </View>
            ))}
          </View> */}
          {/* <View style={styles.upcomingSection}>
            <Text style={styles.subSectionTitle}>Upcoming Exams</Text>
            {upcomingExams.map((exam, index) => {
              if (exam.date > today) {
                return (
                  <View key={index} style={styles.item}>
                    <Text>{exam.subject}:</Text>
                    <Text>{formatDate(exam.date)}</Text>
                  </View>
                );
              }
            })}
          </View> */}
          {/* <View style={styles.passedSection}>
            <Text style={styles.subSectionTitle}>Passed Exams</Text>
            {passedExams.map((exam, index) => (
              <View key={index} style={styles.item}>
                <Text>{exam.subject}:</Text>
                <Text>{formatDate(exam.date)} ({exam.score})</Text>
              </View>
            ))}
          </View> */}
        {/* </View> */}
    {/* </View> */}
  </ScrollView>
</View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 5,
  backgroundColor:'#F6FEFF',
},
profileDate: {
  marginTop:50,
  marginHorizontal:4,
},
divisionLine: {
  width:'100%',
  height:1,
  backgroundColor:'#2AA2C8',
},
profileSection: {
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop:-20,
  marginBottom: 20,
  flexDirection: 'row',
  marginHorizontal:4,
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
personalImage: {
  height:60,
  width:140,
},
todayImage: {
  height:75,
  width:140,
},
passedImage: {
  height:75,
  width:90,
},
personalSection : {
  marginHorizontal:4,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'flex-start',
  borderWidth: 1,
  borderColor: '#2AA2C8',
  backgroundColor:'#fff',
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
},
todayExamsSection : {
  flexDirection:'column',
  borderWidth: 1,
  borderColor: '#2AA2C8',
  backgroundColor:'#fff',
  marginBottom: 10,
  borderRadius: 5,
  marginHorizontal:4,
},
todayExamsSection1 : {
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  padding: 10,
},
todayTitles: {
  color:'#F35B04',
  flexDirection:'column',
  alignItems:'flex-start',
  justifyContent:'flex-start',
},
sectionTitle1: {
  fontSize: 20,
  fontWeight: 'bold',
  color:'#758BFD',
},
seeMore: {
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
},
seeMoreTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color:'#aaa',
},
sectionTitle2: {
  fontSize: 20,
  fontWeight: 'bold',
  color:'#F35B04',
},
passedTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color:'#1982C4',
},
upcomingTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color:'#0EAD69',
},
todayNumber: {
  fontSize: 40,
  color:'#F35B04',
},
upcomingNumber: {
  fontSize: 40,
  color:'#0EAD69',
},
passedNumber: {
  fontSize: 40,
  color:'#1982C4',
},
});


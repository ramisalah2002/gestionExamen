import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/context/AuthContext";
import moment from 'moment';
import { View,StatusBar,TextInput, Text,Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
    <Text style={{fontSize:20,fontWeight:'bold'}}>{formatTime(currentTime)}</Text>
  );
};

const getCurrentTimeInSeconds = () => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};
const Tab = createMaterialTopTabNavigator();

export default function TodayExamsScreen({navigation}) {
  const { user } = useContext(AuthContext);
  const [upcomingExams, setUpcomingExams] = useState([]);

  useEffect(() => {
    fetch("http://10.0.2.2:8000/api/today-exams-filiere/4")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingExams(data);
        console.log("examens success")
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
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <AntDesign style={styles.icon} name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize:24,color:"#fff"}}>{user.name}</Text>
        </View>
        <Text style={styles.titleTop}>Examens à venir ( {upcomingExams.length} )</Text>
        <Text style={styles.textTop}>Ecole Supérieur de technologis Salé - UM5</Text>
      </View>
      <ScrollView contentContainerStyle={styles.passedContainer}>
        {upcomingExams.map((exam, index) => {
          const examTimeInSeconds = moment(`${exam.date}T${exam.heure}`, 'YYYY-MM-DDTHH:mm:ss').diff(moment(), 'seconds');
          const timeDiffInSeconds = examTimeInSeconds > 0 ? examTimeInSeconds : 0;
        
          let backgroundColor;
          if (timeDiffInSeconds <= 0) {
            backgroundColor = 'blue';
          } else if (timeDiffInSeconds < 3600) {
            backgroundColor = 'lightcoral';
          } else if (timeDiffInSeconds < 10800) {
            backgroundColor = 'orange';
          } else {
            backgroundColor = 'lightgreen';
          }
          return (
            <View style={styles.row} key={index}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%' }}>
                  <Text style={styles.name}>
                    <Text style={styles.subject}>{exam.matiere_nom}</Text>
                  </Text>
                  <Text style={styles.date}>{exam.date} {exam.heure}</Text>
                </View>
                {timeDiffInSeconds > 0 ? (
                  <View style={[styles.todayCircle, { backgroundColor }]}>
                    <CountdownTimer time={timeDiffInSeconds} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={()=>navigation.navigate("passerExamScreen",{examId : exam.id,examMatiere : exam.matiere_nom, etudiantName: user.name})} style={[styles.todayCircle, { backgroundColor: '#48bee6' }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Passer</Text>
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
    backgroundColor:'#f3f4f6',
    flex:1,
  },
  row: {
    marginTop:'2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth: 2,
    borderColor:'#FFF',
    borderBottomColor: '#eeeeee',
    borderWidth:1,
    marginBottom: 8,
    backgroundColor: '#ffffff',
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
    flexDirection: 'row',
    marginBottom:5,
    alignItems: 'baseline',
  },
  subject: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#302ea6',
  },
  date: {
    color: '#000',
    fontSize: 16,
    marginBottom:10
  },
  container: {
    flex: 1,
    backgroundColor:'#F6FEFF',
    width:'100%',
    justifyContent:'center',

  },
  circle: {
    borderRadius: 50,
    width: 50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todayCircle: {
    borderRadius: 5,
    width: "100%",
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center'
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
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderRadius:25,
    paddingBottom:30,
    marginBottom:10,
    backgroundColor: "#302ea6",
    width: "100%",
  },
  
});




// import React, { useState } from 'react';
// import moment from 'moment';
// import { View, Text,Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { IconFill, IconOutline } from "@ant-design/icons-react-native";
// import { AntDesign } from '@expo/vector-icons';
// import passedExamScreen from './passedExam';

// export default function dashboardScreen({navigation}) {
// // Get current date and format it in alphabets using moment.js
//   const actualdate = moment().format('Do MMMM YYYY');
// // Display the current date in alphabets
//   const today = new Date();
//   const currentDate = new Date();

//   const formattedDate = currentDate.toLocaleDateString();

//   const todayExams = [
//     { subject: 'Math', date: currentDate },
//     { subject: 'Science', date: currentDate },
//     { subject: 'English', date: currentDate },
//   ];
//   const upcomingExams = [
//     { subject: 'Math', date: new Date(2023, 3, 10) },
//     { subject: 'Science', date: new Date(2023, 3, 12) },
//     { subject: 'English', date: new Date(2023, 3, 15) },
//   ];
//   const passedExams = [
//     { subject: 'History', date: new Date(2023, 2, 27), score: '14/20' },
//     { subject: 'Biology', date: new Date(2023, 2, 31), score: '16/20' },
//   ];

//   const formatDate = (date) => {
//     return date.toLocaleDateString('fr-FR', { month: 'alphabetic', day: 'numeric', year: 'numeric' });
//   };

//   const handlePressPassed = () => {
//     navigation.navigate('passedExamScreen');
//   };

 
 
//   return (
//     <View style={styles.container}>
//     <Text style={styles.profileDate}>{actualdate}</Text>
//       <View style={styles.profileSection}>
//           <Text style={styles.profileName}>Hey! RAMI Salah-eddine</Text>
//           <Image source={ require('../images/salah.jpg') } style={styles.profileImage} />
//       </View>
//       <ScrollView>
//         <View style={styles.personalSection}>
//               <Text style={styles.sectionTitle1}>Informations personnelles</Text>
//               <Image source={ require('../images/personalInfo.png') } style={styles.personalImage}/>
//         </View>
//         <View style={styles.todayExamsSection}>
//           <View style={styles.todayExamsSection1}>
//               <View style={styles.todayTitles}>
//                 <Text style={styles.todayNumber}>2</Text>
//                 <Text style={styles.sectionTitle2}>Examens d’aujourd’hui</Text>
//               </View>
//               <Image source={ require('../images/todayExams.png') } style={styles.todayImage}/>
//           </View>
//           <View style={styles.divisionLine}></View>
//           <TouchableOpacity style={styles.seeMore}>
//             <Text style={styles.seeMoreTitle}>Voir Plus</Text>
//             <AntDesign name="right" size={24} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.todayExamsSection}>
//           <View style={styles.todayExamsSection1}>
//               <View style={styles.todayTitles}>
//                 <Text style={styles.upcomingNumber}>4</Text>
//                 <Text style={styles.upcomingTitle}>Examens à venir</Text>
//               </View>
//               <Image source={ require('../images/upcomingExams.png') } style={styles.todayImage}/>
//           </View>
//           <View style={styles.divisionLine}></View>
//           <TouchableOpacity style={styles.seeMore}>
//             <Text style={styles.seeMoreTitle}>Voir Plus</Text>
//             <AntDesign name="right" size={24} color="gray" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.todayExamsSection}>
//           <View style={styles.todayExamsSection1}>
//               <View style={styles.todayTitles}>
//                 <Text style={styles.passedNumber}>3</Text>
//                 <Text style={styles.passedTitle}>Examens passés</Text>
//               </View>
//               <Image source={ require('../images/passedExams.png') } style={styles.passedImage}/>
//           </View>
//           <View style={styles.divisionLine}></View>
//           <TouchableOpacity onPress={handlePressPassed} style={styles.seeMore}>
//             <Text style={styles.seeMoreTitle}>Voir Plus</Text>
//             <AntDesign name="right" size={24} color="gray" />
//           </TouchableOpacity>
//         </View>
        
        
//         {/* <View
//           style={styles.section}
//           > */}
//           {/* <Text style={styles.sectionTitle}>Exam Dates</Text> */}
//         {/* <View style={styles.expandedSection}> */}
//           {/* <View style={styles.todaySection}>
//             <Text style={styles.subSectionTitle}>Today Exams</Text>
//             {todayExams.map((exam, index) => (
//               <View key={index} style={styles.item}>
//                 <Text>{exam.subject}:</Text>
//                 <Text>14:30</Text>
//               </View>
//             ))}
//           </View> */}
//           {/* <View style={styles.upcomingSection}>
//             <Text style={styles.subSectionTitle}>Upcoming Exams</Text>
//             {upcomingExams.map((exam, index) => {
//               if (exam.date > today) {
//                 return (
//                   <View key={index} style={styles.item}>
//                     <Text>{exam.subject}:</Text>
//                     <Text>{formatDate(exam.date)}</Text>
//                   </View>
//                 );
//               }
//             })}
//           </View> */}
//           {/* <View style={styles.passedSection}>
//             <Text style={styles.subSectionTitle}>Passed Exams</Text>
//             {passedExams.map((exam, index) => (
//               <View key={index} style={styles.item}>
//                 <Text>{exam.subject}:</Text>
//                 <Text>{formatDate(exam.date)} ({exam.score})</Text>
//               </View>
//             ))}
//           </View> */}
//         {/* </View> */}
//     {/* </View> */}
//   </ScrollView>
// </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   padding: 5,
//   backgroundColor:'#F6FEFF',
// },
// profileDate: {
//   marginTop:50,
//   marginHorizontal:4,
// },
// divisionLine: {
//   width:'100%',
//   height:1,
//   backgroundColor:'#2AA2C8',
// },
// profileSection: {
//   justifyContent: 'space-between',
//   alignItems: 'flex-end',
//   marginTop:-20,
//   marginBottom: 20,
//   flexDirection: 'row',
//   marginHorizontal:4,
// },
// profileName: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   marginBottom: 5,
// },
// profileImage: {
//   width: 60,
//   height: 60,
//   borderRadius: 15,
// },
// personalImage: {
//   height:60,
//   width:140,
// },
// todayImage: {
//   height:75,
//   width:140,
// },
// passedImage: {
//   height:75,
//   width:90,
// },
// personalSection : {
//   marginHorizontal:4,
//   flexDirection:'row',
//   justifyContent:'space-between',
//   alignItems:'flex-start',
//   borderWidth: 1,
//   borderColor: '#2AA2C8',
//   backgroundColor:'#fff',
//   padding: 10,
//   marginBottom: 10,
//   borderRadius: 5,
// },
// todayExamsSection : {
//   flexDirection:'column',
//   borderWidth: 1,
//   borderColor: '#2AA2C8',
//   backgroundColor:'#fff',
//   marginBottom: 10,
//   borderRadius: 5,
//   marginHorizontal:4,
// },
// todayExamsSection1 : {
//   flexDirection:'row',
//   justifyContent:'space-between',
//   alignItems:'center',
//   padding: 10,
// },
// todayTitles: {
//   color:'#F35B04',
//   flexDirection:'column',
//   alignItems:'flex-start',
//   justifyContent:'flex-start',
// },
// sectionTitle1: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   color:'#758BFD',
// },
// seeMore: {
//   flexDirection:'row',
//   justifyContent:'space-between',
//   padding:10,
// },
// seeMoreTitle: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   color:'#aaa',
// },
// sectionTitle2: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   color:'#F35B04',
// },
// passedTitle: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   color:'#1982C4',
// },
// upcomingTitle: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   color:'#0EAD69',
// },
// todayNumber: {
//   fontSize: 40,
//   color:'#F35B04',
// },
// upcomingNumber: {
//   fontSize: 40,
//   color:'#0EAD69',
// },
// passedNumber: {
//   fontSize: 40,
//   color:'#1982C4',
// },
// });


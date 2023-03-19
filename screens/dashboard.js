import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, Text,Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//import CountdownTimer from './CountdownTimer';

const passedExams = [
  { id: 1, subject: 'Abd', date: '12/12/2022 à 12:00', mark: 10/20 },
  { id: 2, subject: 'Plsql', date: '12/12/2022 à 14:00', mark: 17/20 },
  { id: 3, subject: 'Orga', date: '12/12/2022 à 16:00', mark: 14/20 },
];

  const date = new Date();
  const currentDate = new Date().toLocaleDateString('fr-FR');

  const todayExams = [
    { id: 1, subject: 'Abd', time: 180, date: "18/03/2023", examTime: "00:54" },
    { id: 2, subject: 'Plsql', time: 200, date: "18/03/2023", examTime: "22:45" },
    { id: 3, subject: 'Orga', time: 120, date: "18/03/2023", examTime: "17:30" },
  ];

const getColorForMark = (mark) => {
  if (mark*20 >= 16) {
    return '#5de093'; // green
  } else if (mark*20 >= 12) {
    return '#f4e086'; // yellow
  } else {
    return '#ea7f85'; // red
  }
};

const renderPassedExamsRows = () => (
  passedExams.map(item => (
    <TouchableOpacity style={styles.row} key={item.id}>
      <View style={styles.subjectContainer}>
        <Text style={styles.name}>
          <Text style={styles.subject}>{item.subject}</Text>
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={[styles.circle, { backgroundColor: getColorForMark(item.mark) }]}>
        <Text style={styles.markText}>{item.mark*20}</Text>
      </View>
    </TouchableOpacity>
  ))
);




//The countdownTimer that allows to display the remaining time for the exam/////
        const formatTime = (timeInSeconds) => {
          const pad = (num, size) => `0${num}`.slice(size * -1);
          const time = parseFloat(timeInSeconds).toFixed(3);
          const hours = Math.floor(time / 60 / 60);
          const minutes = Math.floor(time / 60) % 60;
          const seconds = Math.floor(time - minutes * 60);
          return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
        };

        const CountdownTimer = ({ time }) => {
          const [currentTime, setCurrentTime] = useState(time);
        
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
        
          return (
            <Text>{formatTime(currentTime)}</Text>
          );
        };

        const getCurrentTimeInSeconds = () => {
          const now = new Date();
          return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        };
//////////////////////////////////////////////////////////////////////////






const renderTodayExamsRows = () => (
  todayExams.map((exam, index) => {
    const examTimeInSeconds = parseInt(exam.examTime.split(':')[0],10)*3600 + parseInt(exam.examTime.split(':')[1],10)*60;
    const timeDiffInSeconds = examTimeInSeconds - getCurrentTimeInSeconds();
    const remainingTimeInSeconds = timeDiffInSeconds > 0 ? timeDiffInSeconds : 0;

    let backgroundColor;
    if (remainingTimeInSeconds <= 0) {
      backgroundColor = 'blue';
    }else if (remainingTimeInSeconds < 3600) {
      backgroundColor = 'lightcoral';
    } else if (remainingTimeInSeconds < 10800) {
      backgroundColor = 'orange';
    } else {
      backgroundColor = 'lightgreen';
    }
    return (
      <TouchableOpacity style={styles.row} key={index}>
        <View style={styles.subjectContainer}>
          <Text style={styles.name}>
            <Text style={styles.subject}>{exam.subject}</Text>
          </Text>
          <Text style={styles.date}>{exam.date}</Text>
        </View>
        {remainingTimeInSeconds > 0 ? (
          <View style={[styles.todayCircle, { backgroundColor }]}>
            <CountdownTimer time={remainingTimeInSeconds} />
          </View>
        ) : (
          <TouchableOpacity style={[styles.todayCircle, { backgroundColor: '#48bee6' }]} onPress={() => console.log('Passed Exam:', exam)}>
            <Text style={styles.passerText}>Passer</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  })
);

function PassedScreen() {
  return (
    <ScrollView contentContainerStyle={styles.passedContainer}>
      {renderPassedExamsRows()}
    </ScrollView>
  );
}

function TodayScreen() {
  return (
    <ScrollView contentContainerStyle={styles.passedContainer}>
      {renderTodayExamsRows()}
    </ScrollView>
  );
}
function UpcomingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Exam!</Text>
    </View>
  );
}


const Tab = createMaterialTopTabNavigator();

export default function dashboardScreen() {

  
  const handlePressPassed = () => {
    navigation.navigate('passedExamScreen');
  };

  return (
    <NavigationContainer>
      <View style={{backgroundColor:'#48bee6',height:'15%', justifyContent: 'center', paddingLeft:20,paddingTop:30}}>
        <Text style={{fontSize:28,fontWeight:'bold',color:'white'}}>Exam</Text>
        <Text style={{fontSize:16,fontWeight:'300',color:'#f0f5f4'}}>Ecole supérieure de technologie</Text>
      </View>
      <Tab.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: '#48bee6',fontWeight:'bold'},
        tabBarActiveTintColor: '#feffff',
        tabBarInactiveTintColor: '#b4e9ff',
        tabBarLabelStyle :{fontWeight:'bold',textTransformation:'none',fontSize:14},
        tabBarIndicatorStyle: {
            backgroundColor: '#f3f4f6',
            height: 2,
          },
      }}>
        <Tab.Screen name="Aujourd’hui" component={TodayScreen} />
        <Tab.Screen name="À venir" component={UpcomingScreen} />
        <Tab.Screen name="Passés" component={PassedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  passedContainer: {
    paddingHorizontal: 10,
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
    shadowColor: '#f0f0f0',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    flexDirection: 'row',
    marginBottom:5,
    alignItems: 'baseline',
  },
  subject: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  date: {
    color: '#a5a6a9',
    fontSize: 14,
  },
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
  circle: {
    borderRadius: 50,
    width: 50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todayCircle: {
    borderRadius: 10,
    width: 100,
    height:40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  markText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
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


import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function ExamCorrectionScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <AntDesign style={styles.icon} name="close" size={30} color="white" />
          <AntDesign style={styles.icon} name="arrowright" size={30} color="white" />
        </View>
        <View style={styles.infoBox}>
          <View style={styles.note}>
            <Text style={styles.noteText}>17</Text>
          </View>
          <View style={styles.leftBox}>
            <Text style={styles.leftTextFirst}>Programmation Java (13-03-2022)</Text>
            <Text style={styles.espace}> </Text>
            <Text style={styles.leftTextSecond}>
              Ecole Supérieur de technologis Salé - UM5
            </Text>
          </View>
        </View>
        
      </View>
      <View style={styles.body} resizeMode="cover">
        <View style={styles.bodyLeft}>
          <Text style={styles.bodyFirstText}>Correct</Text>
          <Text style={styles.espace}> </Text>
          <Text style={styles.bodySecondText}>
            17/20
          </Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.bodyRight}>
          <Text style={styles.bodyFirstText}>Wrong</Text>
             <Text style={styles.espace}> </Text>
          <Text style={styles.bodySecondText}>
            3/20
          </Text>
        </View>
      </View>
      <ScrollView>
   
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Liste des Questions</Text>
        <Text style={styles.espace}> </Text>
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          
          <View style={styles.correction}>
              <Text style={styles.question}>Question 1</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerTrue}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.correction}>
              <Text style={styles.question}>Question 2</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerTrue}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.correction}>
              <Text style={styles.question}>Question 3</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerTrue}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.correction}>
              <Text style={styles.question}>Question 4</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerFalse}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.correction}>
              <Text style={styles.question}>Question 5</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerTrue}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
        <View style={styles.questionContainer}>
          <TouchableOpacity>
            <AntDesign style={styles.icon} name="right" size={35} color="black" />
          </TouchableOpacity>
          <View style={styles.correction}>
              <Text style={styles.question}>Question 6</Text>
              <Text style={styles.espace}> </Text>
              <Text style={styles.answerFalse}>Correct Answer</Text>
          </View>
        </View>
        <View style={styles.horizontaleLine} />
      </View>  
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'white',
    flex: 1,
  },
  questionContainer:{
    width:'100%',
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
  },
  infoBox: {
    flexDirection:'row',
    paddingVertical:20
   //marginTop:10,
  },
  topIcons: {
    marginTop:50,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'4%',
    width:'92%',
    justifyContent:'space-between',
  },
  header: {
    backgroundColor: "#3281ff",
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
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 2, // for Android only
  },
  bodyLeft: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginLeft:'20%',
  },
  bodyRight: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginRight:'20%',
  },
  bodyFirstText:{
    color: "#1a1c20",
  },
  bodySecondText:{
    fontSize: 20,
    color: "#59626f",
  },
  verticalLine: {
    borderLeftWidth: 1.5,
    borderLeftColor: '#eeeeee',
    height: 50,
  },
  espace:{
    height: 10,
  },
  innerContainer: {
    backgroundColor:'transparent',
    paddingTop:25,
    paddingLeft:25,
    paddingRight:25,
  },
  title:{
    fontSize: 15,
    fontWeight: "bold",
    color: "#66707c",
  },
  correction:{
    paddingBottom:20,
    paddingTop:20,
  },
  question:{
    fontSize: 15,
    fontWeight: "bold",
  },
  answerTrue:{
    fontSize: 12,
    color:'#5ee093',
    fontWeight: "bold",
  },
  answerFalse:{
    fontSize: 12,
    color:'#f14746',
    fontWeight: "bold",
  },
  horizontaleLine:{
    borderBottomWidth: 1.7,
    borderBottomColor: '#eeee',
  }
});

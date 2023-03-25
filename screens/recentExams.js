import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, ScrollView, FlatList, Touchable } from "react-native";
import ExamsList from "./ExamsList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecentExamsScreen({ navigation }) {
  const pressHandlerClose = () =>{
    navigation.navigate("ExamCorrectionScreen");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
      <View style={styles.topIcons}>
          <TouchableOpacity onPress={pressHandlerClose}>
          <AntDesign style={styles.icon} name="close" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize:24,color:'#fff'}}>Boulaajoul Anass</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.leftBox}>
            <Text style={styles.leftTextFirst}>
              Examens passés ( 6 )
            </Text>
            <Text style={styles.espace}> </Text>
            <Text style={styles.leftTextSecond}>
              Ecole Supérieur de technologis Salé - UM5
            </Text>
          </View>
        </View>
      </View>
      
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Liste des examens passés</Text>
          <Text style={styles.espace}> </Text>
          <ExamsList />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  questionContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoBox: {
    flexDirection: "row",
    paddingVertical: 20,
    marginLeft: "4%",
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
    backgroundColor: "#302ea6",
    width: "100%",
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flexDirection: "column",
  },

  leftTextFirst: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },
  leftTextSecond: {
    fontSize: 14,
    color: "#FFFF",
  },
  leftBox: {
    height: 75,
    borderRadius: 10,
    marginLeft: "2%",
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
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 2, // for Android only
  },
  bodyLeft: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginLeft: "20%",
  },
  bodyRight: {
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    marginRight: "20%",
  },
  bodyFirstText: {
    color: "#1a1c20",
  },
  bodySecondText: {
    fontSize: 20,
    color: "#59626f",
  },
  verticalLine: {
    borderLeftWidth: 1.5,
    borderLeftColor: "#eeeeee",
    height: 50,
  },
  espace: {
    height: 10,
  },
  innerContainer: {
    backgroundColor: "transparent",
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#66707c",
  },
  correction: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
  },
  answerTrue: {
    fontSize: 12,
    color: "#5ee093",
    fontWeight: "bold",
  },
  answerFalse: {
    fontSize: 12,
    color: "#f14746",
    fontWeight: "bold",
  },
  horizontaleLine: {
    borderBottomWidth: 1.7,
    borderBottomColor: "#eeee",
  },
});

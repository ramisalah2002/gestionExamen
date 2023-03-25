import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ExamCorrectionScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
    // Do your search logic here
  };

  const pressHandlerLogout = () =>{
    // ndiro logout
  }
  const pressHandlerRecent = () =>{
    navigation.navigate('RecentExamsScreen');
  }
  const pressHandlerToday = () =>{
    navigation.navigate('SignupScreen');
  }
  const pressHandlerInfo = () =>{
    navigation.navigate('InformationsScreen');
  }

  // l icon li lfo9 3la limn n9dro nbdloha b logout

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <TouchableOpacity>
          <Ionicons name="log-out-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize:24,color:'#fff'}}>Boulaajoul Anass</Text>
        </View>
        <Text style={styles.titleTop}>Bonjour!</Text>
        <Text style={styles.textTop}>Quel Examen désirez-vous voir ?</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.containerSearch}>
            <AntDesign name="search1" size={20} color="#cdcde9" />
            <TextInput
              style={styles.input}
              placeholderTextColor="#cdcde9"
              placeholder="Cherchez votre Examen"
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
          <View style={styles.containerFilter}>
            <TouchableOpacity style={styles.filterButton}>
              <AntDesign name="filter" size={20} color="#cdcde9" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.body} resizeMode="cover">
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.bodyFirstText}>Examens Récents</Text>
              <View style={styles.seeAllBox}>
                <TouchableOpacity onPress={pressHandlerRecent}>
                  <Text style={styles.seeAll}>voir plus</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row",justifyContent:'space-around'}}>
              <View style={styles.examPrevious}>
                  <View style={styles.languageBox}>
                    <Text style={styles.language}>PHP MYSQL</Text>
                  </View>
                <View style={styles.noteBox}>
                  <Text style={styles.note}>17/20</Text>
                </View>
              </View>
              <View style={styles.examPrevious}>
                  <View style={styles.languageBox}>
                    <Text style={styles.language}>SQL ORACLE</Text>
                  </View>
                <View style={styles.noteBox}>
                  <Text style={styles.note}>14/20</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.bodyFirstText}>Examens d'aujourd'hui</Text>
              <View style={styles.seeAllBox}>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>voir plus</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ScrollView horizontal>
                <View style={styles.todayExam}>
                  <TouchableOpacity>
                    <View style={styles.languageBox}>
                      <Text style={styles.language}> Java</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.todayExamInformation}>
                    <Text style={styles.todayExamInformationText1}>
                      Programmation Java
                    </Text>
                    <Text style={styles.todayExamInformationText2}>
                      commence : 16:30
                    </Text>
                    <Text style={styles.todayExamInformationText3}>
                      reste : 10h 30min
                    </Text>
                  </View>
                  <View style={styles.verticalLine} />
                </View>
                <View style={styles.todayExam}>
                  <TouchableOpacity>
                    <View style={styles.languageBox}>
                      <Text style={styles.language}>Français</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.todayExamInformation}>
                    <Text style={styles.todayExamInformationText1}>
                      La langue Française
                    </Text>
                    <Text style={styles.todayExamInformationText2}>
                      commence : 12:30
                    </Text>
                    <Text style={styles.todayExamInformationText3}>
                      reste : 6h 30min
                    </Text>
                  </View>
                  <View style={styles.verticalLine} />
                </View>
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.bodyFirstText}>Mes informations personnelles</Text>
              <View style={styles.seeAllBox}>
                <TouchableOpacity onPress={pressHandlerInfo}>
                  <Text style={styles.seeAll}>voir plus</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  titleTop: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  textTop: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 17,

    color: "#c8ceed",
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
    //marginTop:10,
  },
  containerSearch: {
    padding: 7,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5554b7",
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 15,
    width: "72%",
    marginBottom: 30,
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
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: "#ffff",
  },
  filterButton: {
    padding: 10,
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
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#302ea6",
    width: "100%",
  },
  body: {
    backgroundColor: "#FFFF",
    resizeMode: "contain",
    height: "12%",
    width: "100%",
    minWidth: "100%",
    justifyContent: "space-between",
  },
  bodyFirstText: {
    marginTop: 30,
    paddingLeft:10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#13129e",
    height: 33,
  },
  bodyFirstTextInfo: {
    paddingLeft:10,
    fontSize: 20,
    alignItems:'center',
    justifyContent:'center',
    fontWeight: "bold",
    color: "#13129e",
    height:'100%'
  },
  seeAllBox: {
    padding: 5,
    justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#eaeaf6",
    borderRadius: 5,
    marginTop: 27,
    marginRight: 20,
    marginBottom: 20,
  },
  seeAll: {
    fontSize: 18,
    color: "#13129e",
  },
  examPrevious: {
    padding: 7,
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#302ea6",
    borderRadius: 10,
    width: "40%",
    height: 160,
    marginBottom: 0,
  },
  language: {
    fontSize: 15,
    color: "#ffff",
  },
  languageBox: {
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8282c9",
    borderRadius: 5,
    width: '80%',
    minWidth: 70,
    height: 40,
  },
  noteBox: {
    backgroundColor: "#8282c9",
    color: "#FFFF",
    height: 75,
    width: '80%',
    borderRadius: 5,
    marginTop:10,
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
  },
  note: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFF",
  },
  todayExam: {
    padding: 7,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#302ea6",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 200,
    width: 85,
    height: 85,
    marginTop: 10,
    marginBottom: 10,
  },
  todayExamInformation: {
    paddingTop: 15,
    marginLeft: 20,
    marginRight: -30,
    flexDirection: "column",
    width: 200,
  },
  todayExamInformationText1: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  todayExamInformationText2: {
    marginBottom: 7,
  },
  todayExamInformationText3: {
    color: "orange",
    fontWeight: "bold",
    marginBottom: 10,
  },
  verticalLine: {
    borderLeftWidth: 1.5,
    borderLeftColor: "#eeeeee",
    height: 50,
  },
  espace: {
    height: 10,
  },
});

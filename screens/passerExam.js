import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import axios from "axios";
import {CheckBox} from "react-native-elements";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function passerExamScreen({ navigation }) {
    const [coloredCheckBoxValue, setColoredCheckBoxValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
    // Do your search logic here
  };

  // l icon li lfo9 3la limn n9dro nbdloha b logout

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
                  <Text style={styles.scoreNumber}>10</Text>
                </View>
            </View>
            <View style={styles.headerCountdown}>
                <Text style={styles.itemTitle}>Temps restant</Text>
                <View style={styles.countdownTime}>
                    <View style={styles.itemHourContainer}>
                        <Text style={styles.HourNumber}>06</Text>
                    </View>
                    <View style={styles.itemMinuteContainer}>
                      <Text style={styles.MinuteNumber}>16</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
        <ScrollView>
            <View style={[styles.infoContainer,{marginTop:40,paddingHorizontal: 20,}]}>
                <Text style={styles.bodyFirstText}>Informations sur l'examen</Text>
                <View style={[styles.info,{flexDirection:'row',alignItems:'center',}]}>
                    <View style={styles.itemQuestionsContainer}>
                        <Text style={styles.questionsNumber}>Questions</Text>
                        <Text style={styles.itemTitle}>16</Text>
                    </View>
                    <View style={styles.itemTimeContainer}>
                        <Text style={styles.questionsNumber}>Temps d'examen</Text>
                        <Text style={styles.itemTitle}>02H00M</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.questionsContainer,{marginTop:20,paddingHorizontal: 20,}]}>
                <View style={styles.questContainer}>
                    <View style={[styles.questionTitle,{flexDirection:'column',alignItems:'center',}]}>
                        <View style={{flexDirection:'row',alignItems:'center',}}>
                            <View style={styles.questionNumberContainer}>
                              <Text style={styles.questionNumber}>Q 01</Text>
                            </View>
                            <Text style={styles.questionText}>what what what what what what what what what what what whgfgd ufdgdfg ?</Text>
                        </View>
                        <View style={[styles.propositionsContainer,{flexDirection:'column',width:'100%',alignItems:'flex-start'}]}>
                            <CheckBox
                                containerStyle={{backgroundColor:'#f3f4f6',borderWidth:0,alignItems:'flex-start',marginBottom:-15}}
                                title={'test test test test test test test test test test'}
                                checked={coloredCheckBoxValue}
                                textStyle={{color:'#302f34'}}
                                checkedColor='#1dd1a1'
                                onPress={()=>setColoredCheckBoxValue(!coloredCheckBoxValue)}
                            />
                            <CheckBox
                                containerStyle={{backgroundColor:'#f3f4f6',borderWidth:0,alignItems:'flex-start',marginBottom:-15}}
                                title={'test test test test test test test test test test'}
                                checked={coloredCheckBoxValue}
                                textStyle={{color:'#302f34'}}
                                checkedColor='#1dd1a1'
                                onPress={()=>setColoredCheckBoxValue(!coloredCheckBoxValue)}
                            />
                            <CheckBox
                                containerStyle={{backgroundColor:'#f3f4f6',borderWidth:0,alignItems:'flex-start',marginBottom:-15}}
                                title={'test test test test test test test test test test'}
                                checked={coloredCheckBoxValue}
                                textStyle={{color:'#302f34'}}
                                checkedColor='#1dd1a1'
                                onPress={()=>setColoredCheckBoxValue(!coloredCheckBoxValue)}
                            />
                            <CheckBox
                                containerStyle={{backgroundColor:'#f3f4f6',borderWidth:0,alignItems:'flex-start',marginBottom:-15}}
                                title={'test test test test test test test test test test'}
                                checked={coloredCheckBoxValue}
                                textStyle={{color:'#302f34'}}
                                checkedColor='#1dd1a1'
                                onPress={()=>setColoredCheckBoxValue(!coloredCheckBoxValue)}
                            />
                            
                            
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
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  titleTop: {
    marginLeft: 20,
    fontSize: 30,
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
    fontSize: 30,
    fontWeight: "900",
    color: "#2b2780",
  },
  HourNumber: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2b2780",
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#121123",
  },
  MinuteNumber: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ff8645",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e5f3ff",
  },
  headerScore: {
    alignItems:'center',
  },
  itemScoreContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:80,
    height:60,
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
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:10
  },
  itemMinuteContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:50,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTimeContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:'45%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemQuestionsContainer: {
    backgroundColor: '#f6f5fa',
    borderRadius: 5,
    width:'45%',
    height:60,
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
    height:'60%',
    borderRadius:15,
    padding:25,
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
    padding:20,
    
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
    marginTop: 90,
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

});

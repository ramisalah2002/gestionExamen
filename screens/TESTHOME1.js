import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../src/context/AuthContext";
import axios from "axios";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const filterExams = (searchText, filter) => {
    const filtered = exams.filter((exam) => {
      const examDate = new Date(exam.date);
      const today = new Date();
      const isToday = examDate.toDateString() === today.toDateString();
      const isUpcoming = examDate >= today;;
      const isPassed = examDate < today;
  
      switch (filter) {
        case "PassedExam":
          if (!isPassed) return false;
          break;
        case "UpcommingExam":
          if (!isUpcoming) return false;
          break;
        case "TodayExam":
          if (!isToday) return false;
          break;
        default:
          break;
      }
  
      return exam.title.toLowerCase().startsWith(searchText.toLowerCase());
    });
  
    return filtered;
  };
  


  const FilterDropdown = ({ onSelect }) => {
    return (
      <View style={styles.dropdown}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelect("PassedExam")}
        >
          <Text style={styles.optionText}>Passed Exam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelect("UpcomingExam")}
        >
          <Text style={styles.optionText}>Upcoming Exam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelect("TodayExam")}
        >
          <Text style={styles.optionText}>Today Exam</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const dummyExams = [
      { id: 1, title: "PHP MySQL", score: "17/20", date: "2023-03-22" },
      { id: 2, title: "SQL Oracle", score: "14/20", date: "2023-03-24" },
      { id: 3, title: "JavaScript", score: "18/20", date: "2023-03-20" },
      { id: 4, title: "React Native", score: "16/20", date: "2023-03-21" },
      { id: 5, title: "Angular", score: "19/20", date: "2023-03-25" },
      { id: 6, title: "Vue.js", score: "15/20", date: "2023-03-23" },
      { id: 7, title: "Python", score: "20/20", date: "2023-03-26" },
      { id: 8, title: "Ruby on Rails", score: "13/20", date: "2023-03-27" },
      { id: 9, title: "Java", score: "17/20", date: "2023-03-28" },
      { id: 10, title: "C++", score: "14/20", date: "2023-03-29" },
    ];

    setExams(dummyExams);
    setFilteredExams(dummyExams);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    setFilteredExams(filterExams(text, activeFilter));
  };
  

  useEffect(() => {
    if (searchTerm) {
      const results = exams.filter((exam) =>
        exam.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredExams(results);
    } else {
      setFilteredExams([]);
    }
  }, [searchTerm]);

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setShowResults(false);
  };

  // l icon li lfo9 3la limn n9dro nbdloha b logout

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header} resizeMode="cover">
        <View style={styles.topIcons}>
          <AntDesign
            style={styles.icon}
            name="menuunfold"
            size={30}
            color="white"
          />
          <AntDesign
            style={styles.icon}
            name="arrowright"
            size={30}
            color="white"
          />
        </View>
        <Text style={styles.titleTop}>Hi, Anass</Text>
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
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.containerFilter}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <AntDesign name="filter" size={20} color="#cdcde9" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        {!showResults && (
          <>
            <View style={styles.body} resizeMode="cover">
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.bodyFirstText}>Examens Recents</Text>
                  <View style={styles.seeAllBox}>
                    <TouchableOpacity>
                      <Text style={styles.seeAll}>voir plus</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.examPrevious}>
                    <TouchableOpacity>
                      <View style={styles.languageBox}>
                        <Text style={styles.language}>PHP MYSQL</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.noteBox}>
                      <Text style={styles.note}>17/20</Text>
                    </View>
                  </View>
                  <View style={styles.examPrevious}>
                    <TouchableOpacity>
                      <View style={styles.languageBox}>
                        <Text style={styles.language}>SQL ORACLE</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.noteBox}>
                      <Text style={styles.note}>14/20</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.bodyFirstText}>
                    Examens d'aujourd'hui
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.bodyFirstText}>
                    Vos Informations Personnelles
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {showResults && (
          <View>
            {filteredExams.map((exam, index) => (
              <View key={index} style={styles.searchResult}>
                <Text style={styles.searchResultTitle}>{exam.title}</Text>
                <Text style={styles.searchResultDate}>{exam.date}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {dropdownVisible && (
        <FilterDropdown
        onSelect={(filter) => {
            setActiveFilter(filter);
            setFilteredExams(filterExams(searchTerm, filter));
            setDropdownVisible(false);
          }}
          
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  titleTop: {
    marginTop: 50,
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
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#13129e",
    height: 33,
  },
  seeAllBox: {
    padding: 7,
    alignItems: "center",
    backgroundColor: "#eaeaf6",
    borderRadius: 10,
    marginTop: 27,
    marginLeft: "27%",
    marginRight: 20,
    height: 33,
    marginBottom: 20,
  },
  seeAll: {
    fontSize: 15,
    color: "#13129e",
  },
  examPrevious: {
    padding: 7,
    alignItems: "center",
    backgroundColor: "#302ea6",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 10,
    width: "40%",
    height: 160,
    marginBottom: 0,
  },
  language: {
    fontSize: 15,
    color: "#ffff",
  },
  languageBox: {
    padding: 7,
    alignItems: "center",
    backgroundColor: "#8282c9",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 0,
    width: "100%",
    minWidth: 70,
    height: 33,
  },
  noteBox: {
    padding: 15,
    paddingTop: 18,
    alignItems: "center",
    backgroundColor: "#8282c9",
    borderRadius: 50,
    marginTop: "20%",
    marginLeft: 0,
    height: 50,
  },
  note: {
    fontSize: 14,
    color: "#ffff",
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
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    right: 20,
    top: 65,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdown: {
    position: "absolute",
    top: 175,
    right: 20,
    backgroundColor: "#302ea6",
    borderRadius: 10,
    padding: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#8282c9",
  },
  optionText: {
    color: "#eaeaf6",
    fontSize: 16,
  },
  searchResult: {
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#302ea6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  searchResultTitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  searchResultDate: {
    fontSize: 14,
    color: "#e5f3ff",
  },
});

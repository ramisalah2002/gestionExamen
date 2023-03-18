import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
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
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containerSearch}>
            <AntDesign name="search1" size={20} color="#cdcde9" />
            <TextInput
              style={styles.input}
              placeholderTextColor="#cdcde9"
              placeholder="Cherchez votre Exam"
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.bodyFirstText}>Examens Recents</Text>
            <View style={styles.seeAllBox}>
              <TouchableOpacity>
                <Text style={styles.seeAll}>voir tout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.seeAllBox}>
             
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
  },
  seeAllBox: {
    padding: 7,
    alignItems: "center",
    backgroundColor: "#eaeaf6",
    borderRadius: 10,
    marginTop: 27,
    marginLeft: "27%",
    marginRight: 20,
    width: "20%",
    height: 33,
    marginBottom: 30,
  },
  seeAll: {
    fontSize: 15,
    color: "#13129e",
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
  horizontaleLine: {
    borderBottomWidth: 1.7,
    borderBottomColor: "#eeee",
  },
});

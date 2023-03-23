import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Switch,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";

export default function InformationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Vos Informations</Text>
          <Text style={styles.secondText}>
            Vous trouverez dans cette page vos informations personnelles{" "}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/Informations.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.informationsContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.informationTitle}>Nom Complet</Text>
            <Text style={styles.informationText}>Laawamir Anass</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationTitle}>Email</Text>
            <Text style={styles.informationText}>Dasisko@gmail.com</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationTitle}>Filiere</Text>
            <Text style={styles.informationText}>Génie Logiciel</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationTitle}>Password</Text>
            <Text style={styles.informationText}>®®®®®®®®</Text>
            <View style={{marginBottom: 5}}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ef1f3",
    margin: 20,
    marginBottom:0,
    marginTop:10,
  },
  titleText: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "#302ea6",
  },
  secondText: {
    marginTop: 10,
    fontSize: 18,
    // fontWeight: "bold",
    color: "grey",
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 10,
    alignItems: "flex-start",
    width: "95%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "70%",
    height: 170,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 30,
  },
  informationsContainer: {
    flexDirection: "column",
    margin: 10,
    marginTop:0,
    backgroundColor: "#ffff",
    borderRadius: 25,
    shadowColor: "#111952",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 7,
    padding: 15,
  },
  informationContainer: {
    padding: 10,
  },
  informationTitle: {
    color: "#263e4d",
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  informationText: {
    color: "#525b68",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 5,
  },
  horizontalLine: {
    height: 1.7,
    backgroundColor: "#f7f7f7",
    marginTop: 25,
    marginBottom: -5,
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7",
    marginHorizontal: -25,
    width: "118%",
  },
});

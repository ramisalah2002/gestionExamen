import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from "nativewind";
import Home from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import deptChoiceScreen from "../screens/deptChoice";
import dashboardScreen from "../screens/dashboard";
import passedExamScreen from "../screens/passedExam";
import ExamCorrectionScreen from "../screens/ExamCorrection";
import HomeTestScreen from "../screens/HomeTest";
import RegisterTestScreen from "../screens/RegisterTest";
import InformationsScreen from "../screens/Informations";
import passerExamScreen from "../screens/passerExam";
import InformationsExamenScreen from "../screens/InformationsExamen";
import qcmTest from "../screens/qcmTest";

const screens = {
  LoginScreen: {
    screen: InformationsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomeTestScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignupScreen: {
    screen: SignupScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  passedExamScreen: {
    screen: passedExamScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  deptChoiceScreen: {
    screen: deptChoiceScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

  dashboardScreen: {
    screen: dashboardScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterTestScreen: {
    screen: RegisterTestScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from "nativewind";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import HomeScreen from "../screens/Home";
import InformationsScreen from "../screens/Informations";
import passerExamScreen from "../screens/passerExam";
import ExamCorrectionScreen from "../screens/ExamCorrection";
import RecentExamsScreen from "../screens/recentExams";
import openAppScreen from "../screens/openApp";
import TodayExamsScreen from "../screens/TodayExams";

const screens = {
  openAppScreen: {
    screen: openAppScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
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

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TodayExamsScreen: {
    screen: TodayExamsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  InformationsScreen: {
    screen: InformationsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RecentExamsScreen: {
    screen: RecentExamsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  passerExamScreen: {
    screen: passerExamScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ExamCorrectionScreen: {
    screen: ExamCorrectionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

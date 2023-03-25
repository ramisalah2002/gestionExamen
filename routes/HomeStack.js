import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from "nativewind";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import deptChoiceScreen from "../screens/deptChoice";
import dashboardScreen from "../screens/dashboard";
import passedExamScreen from "../screens/passedExam";
import HomeScreen from "../screens/Home";
import LoginTestScreen from "../screens/LoginTest";
import RegisterTestScreen from "../screens/RegisterTest";
import InformationsScreen from "../screens/Informations";
import passerExamScreen from "../screens/passerExam";
import ExamCorrectionScreen from "../screens/ExamCorrection";
import qcmTest from "../screens/qcmTest";
import RecentExamsScreen from "../screens/recentExams";
import UserList from "../screens/UserList";
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
  deptChoiceScreen: {
    screen: deptChoiceScreen,
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
  ExamCorrectionScreen: {
    screen: ExamCorrectionScreen,
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
  RegisterTestScreen: {
    screen: RegisterTestScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

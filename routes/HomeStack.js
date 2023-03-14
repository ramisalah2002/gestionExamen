import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from 'nativewind';
import TestScreen from "../screens/TestScreen";
import LoginProf from "../screens/LoginProf"
import LoginStudent from "../screens/LoginStudent";
import ProfSign from "../screens/ProfSign";
import StudentSign from "../screens/StudentSign";
import Home from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import SubjectChoiceScreen from "../screens/SubjectChoice";
import deptChoiceScreen from "../screens/deptChoice";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";



const screens = {
    Home : {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
    LoginScreen : {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },
    SignupScreen : {
        screen: SignupScreen,
        navigationOptions: {
            header: null,
        },
    },
    deptChoiceScreen : {
        screen: deptChoiceScreen,
        navigationOptions: {
            header: null,
        },
    },
    SubjectChoiceScreen : {
        screen: SubjectChoiceScreen,
        
    },

    TestScreen : {
        screen: TestScreen,
        navigationOptions: {
            header: null,
        },
    },
    LoginProf : {
        screen: LoginProf,
        navigationOptions: {
            header: null,
        },
    },
    LoginStudent : {
        screen: LoginStudent,
        navigationOptions: {
            header: null,
        },
    },
    ProfSign : {
        screen: ProfSign,
        navigationOptions: {
            header: null,
        },
    },
    StudentSign : {
        screen: StudentSign,
        navigationOptions: {
            header: null,
        },
    },
    
    
    
}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
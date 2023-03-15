import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from 'nativewind';
import Home from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import deptChoiceScreen from "../screens/deptChoice";



const screens = {
    Home : {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    LoginScreen : {
        screen: dashboard,
        navigationOptions: {
            headerShown: false
        },
    },
    SignupScreen : {
        screen: SignupScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    passedExamScreen : {
        screen: passedExamScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    deptChoiceScreen : {
        screen: deptChoiceScreen,
        navigationOptions: {
            headerShown: false,
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
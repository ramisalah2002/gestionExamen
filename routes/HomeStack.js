import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { NativeWindStyleSheet } from 'nativewind';
import Home from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import deptChoiceScreen from "../screens/deptChoice";
import dashboard from "../screens/dashboard";
import ExamCorrection from "../screens/ExamCorrection";


const screens = {
    Home : {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },
    LoginScreen : {
        screen: dashboard,
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
}


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
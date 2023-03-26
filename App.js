import { StyleSheet, View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { Switch } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./routes/HomeStack";
import { AuthProvider } from "./src/context/AuthContext";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <HomeScreen/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

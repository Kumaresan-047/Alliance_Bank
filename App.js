import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigIn from "./src/components/auth/signIn"
import Account from "./src/components/screens/AccountScreen"
import Transfer from "./src/components/screens/TransferScreen"
import Toast, { BaseToast } from "react-native-toast-message";

const Stack = createStackNavigator();

const App = () => {
  const toastConfig = {
    error: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#b00020',
          borderLeftWidth: 8,
          backgroundColor: '#fff',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f4d82',
        }}
        text2Style={{
          fontSize: 14,
          color: 'black',
        }}
      />
    ),
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "green",
          borderLeftWidth: 8,
          backgroundColor: '#fff',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f4d82',
        }}
        text2Style={{
          fontSize: 14,
          color: 'black',
        }}
      />
    ),
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signIn" component={SigIn} />
        <Stack.Screen name="accountScreen" component={Account} />
        <Stack.Screen name="transferScreen" component={Transfer} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  )
}
export default App;
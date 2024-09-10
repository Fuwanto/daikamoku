import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import login from "./login";
import register from "./register";
import index from "./index";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="register" component={register} />
          <Stack.Screen name="index" component={index} />
        </Stack.Navigator>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

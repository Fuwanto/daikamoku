import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, TextInput, Button, Text, Alert, Image } from "react-native";
import { login_api } from "../services/auth_services";

export default function LoginScreen({ navigation }) {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const isLoggedIn = await login_api(email, password);

    if (isLoggedIn) {
      Alert.alert("Success", "Login successful!");
      setAuthenticated(true);
      navigation.navigate("index");
    } else {
      Alert.alert("Login failed", "Invalid credentials or inactive account.");
    }
  };

  return (
    <View className="flex-1 justify-center p-4">
      <Image
        className="w-28 h-28 mx-auto"
        source={require("../assets/buho.png")}
      />
      <Text className="text-2xl font-bold text-center mb-4">Login</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

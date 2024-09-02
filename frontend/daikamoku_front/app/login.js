import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { login_api, logout_api } from "../services/auth_services";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const isLoggedIn = await login_api(email, password);

    if (isLoggedIn) {
      Alert.alert("Login successful", "You are logged in!");
    } else {
      Alert.alert("Login failed", "Invalid credentials or inactive account.");
    }
  };

  const handleLogout = async () => {
    const isLoggedOut = await logout_api();

    if (isLoggedOut) {
      Alert.alert("Logout successful", "You are logged out!");
    } else {
      Alert.alert("Logout failed", "An error occurred while logging out.");
    }
  };

  return (
    <View className="flex-1 justify-center p-4">
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
      <Button title="logout" onPress={handleLogout} />
      <Link href="/"> home</Link>
    </View>
  );
}

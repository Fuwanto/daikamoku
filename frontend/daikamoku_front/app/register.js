import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { register_api } from "../services/auth_services";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const success = await register_api(
      email,
      password,
      confirmPassword,
      username
    );
    if (success) {
      Alert.alert(
        "Success",
        "Registration successful! Please check your email to confirm your account."
      );
      navigation.navigate("login");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? (
        <Text className="border border-gray-300 rounded p-2 mb-4">{error}</Text>
      ) : null}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

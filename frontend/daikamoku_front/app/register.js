import React, { useState } from "react";
import { View, TextInput, Text, Alert, Pressable, Image } from "react-native";
import { register_api } from "../services/auth_services";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleRegister = async () => {
    const errors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!email.trim()) {
      errors.email = "El Email no puede estar vacío.";
    }
    if (!username.trim()) {
      errors.username = "El Usuario no puede estar vacío.";
    }
    if (!password.trim()) {
      errors.password = "La Contraseña no puede estar vacía.";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword =
        "La Confirmación de la Contraseña no puede estar vacía.";
    }

    if (password !== confirmPassword) {
      errors.password = "Passwords do not match.";
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);

    // Si hay errores de validación, no realiza la solicitud
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    // Realiza la solicitud de registro si no hay errores de validación
    const result = await register_api(
      email,
      password,
      confirmPassword,
      username
    );

    if (result.success) {
      Alert.alert(
        "Success",
        "Registration successful! Please check your email to confirm your account."
      );
      navigation.navigate("login");
    } else {
      // Si hay errores en la respuesta, actualízalos en el estado
      setFieldErrors(result.errors);
    }
  };

  return (
    <View className="flex-1 flex-col bg-black">
      <View className="flex-auto justify-center items-center bg-black">
        <Text className="text-4xl font-bold text-white text-center p-4">
          Crea una cuenta
        </Text>
        <Image
          className="w-28 h-28"
          source={require("../assets/formulario.png")}
        />
      </View>

      <View className="flex-auto items-center bg-white rounded-3xl p-4">
        <Text className="text-auto text-neutral-700 text-left w-80 mb-2 p-2">
          Email
        </Text>
        <TextInput
          className={`font-bold rounded-2xl p-2 w-80 bg-slate-100 ${
            fieldErrors.email ? "border-red-500 border-2" : ""
          }`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
        {fieldErrors.email ? (
          <Text className="text-red-500 text-sm">{fieldErrors.email}</Text>
        ) : null}

        <Text className="text-base text-neutral-700 text-left w-80 mb-2 p-2">
          Usuario
        </Text>
        <TextInput
          className={`font-bold rounded-2xl p-2 w-80 bg-slate-100 ${
            fieldErrors.username ? "border-red-500 border-2" : ""
          }`}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
        {fieldErrors.username ? (
          <Text className="text-red-500 text-sm">{fieldErrors.username}</Text>
        ) : null}

        <Text className="text-base text-neutral-700 text-left w-80 mb-2 p-2">
          Constraseña
        </Text>
        <TextInput
          className={`font-bold rounded-2xl p-2 w-80 bg-slate-100 ${
            fieldErrors.password ? "border-red-500 border-2" : ""
          }`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
        {fieldErrors.password ? (
          <Text className="text-red-500 text-sm">{fieldErrors.password}</Text>
        ) : null}

        <Text className="text-base text-neutral-700 text-left w-80 mb-2 p-2">
          Confirme la contraseña
        </Text>
        <TextInput
          className={`font-bold rounded-2xl p-2 w-80 bg-slate-100 ${
            fieldErrors.confirmPassword ? "border-red-500 border-2" : ""
          }`}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />
        {fieldErrors.confirmPassword ? (
          <Text className="text-red-500 text-sm">
            {fieldErrors.confirmPassword}
          </Text>
        ) : null}

        <Pressable
          className="bg-custom-blue p-4 rounded-2xl m-4"
          onPress={handleRegister}
        >
          <Text className="text-xl font-bold text-white">Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
}

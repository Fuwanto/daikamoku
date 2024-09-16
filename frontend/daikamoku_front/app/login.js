import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, TextInput, Text, Alert, Pressable, Image } from "react-native";
import { login_api } from "../services/auth_services";

export default function LoginScreen({ navigation }) {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleLogin = async () => {
    // Inicializa errores de campo
    const errors = {
      email: "",
      password: "",
    };

    // Verifica si algún campo está vacío
    if (!email.trim()) {
      errors.email = "El Email no puede estar vacío.";
    }
    if (!password.trim()) {
      errors.password = "La Contraseña no puede estar vacía.";
    }

    // Actualiza el estado con los errores
    setFieldErrors(errors);

    // Si hay errores de validación, no realiza la solicitud
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    // Realiza la solicitud de inicio de sesión si no hay errores de validación
    const result = await login_api(email, password);

    if (result === true) {
      Alert.alert("Success", "Login successful!");
      setAuthenticated(true);
      navigation.navigate("index");
    } else {
      // Si hay errores en la respuesta, actualízalos en el estado
      setFieldErrors({
        general: "Invalid credentials or inactive account.",
      });
    }
  };

  return (
    <View className="flex-1 flex-col bg-black">
      <View className="flex-auto justify-center items-center bg-black">
        <Text className="text-4xl font-bold text-white text-center p-4">
          Login
        </Text>
        <Image className="w-28 h-28" source={require("../assets/buho.png")} />
      </View>

      <View className="flex-auto items-center bg-white rounded-3xl p-4">
        <Text className="text-base text-neutral-700 text-left w-80 mb-2 p-2">
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
          Contraseña
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

        {fieldErrors.general ? (
          <Text className="text-red-500 text-center mb-4">
            {fieldErrors.general}
          </Text>
        ) : null}

        <Pressable
          className="bg-custom-blue p-4 rounded-2xl m-4"
          onPress={handleLogin}
        >
          <Text className="text-xl font-bold text-white">Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

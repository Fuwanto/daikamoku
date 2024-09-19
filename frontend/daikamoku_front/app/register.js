import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { handleRegister } from "../handlers/authHandlers";
import Form from "../components/Form";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const fields = [
    {
      name: "email",
      label: "Email",
      value: email,
      onChange: setEmail,
      placeholder: "Email",
      isPassword: false,
    },
    {
      name: "username",
      label: "Usuario",
      value: username,
      onChange: setUsername,
      placeholder: "Username",
      isPassword: false,
    },
    {
      name: "password",
      label: "Contraseña",
      value: password,
      onChange: setPassword,
      placeholder: "Password",
      isPassword: true,
    },
    {
      name: "confirmPassword",
      label: "Confirme la contraseña",
      value: confirmPassword,
      onChange: setConfirmPassword,
      placeholder: "Confirm Password",
      isPassword: true,
    },
  ];

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

      <Form
        fields={fields}
        onSubmit={() =>
          handleRegister(
            email,
            username,
            password,
            confirmPassword,
            setFieldErrors,
            navigation
          )
        }
        buttonText="Registrarse"
        fieldErrors={fieldErrors}
      />
    </View>
  );
}

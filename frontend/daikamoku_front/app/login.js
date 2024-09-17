import React, { useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { handleLogin } from "../services/authHandlers";
import Form from "../components/Form";

export default function LoginScreen({ navigation }) {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      name: "password",
      label: "Contraseña",
      value: password,
      onChange: setPassword,
      placeholder: "Password",
      isPassword: true,
    },
  ];

  return (
    <View className="flex-1 flex-col bg-black">
      <View className="flex-auto justify-center items-center bg-black">
        <Text className="text-4xl font-bold text-white text-center p-4">
          Login
        </Text>
        <Image className="w-28 h-28" source={require("../assets/buho.png")} />
      </View>

      <Form
        fields={fields}
        onSubmit={() =>
          handleLogin(
            email,
            password,
            setAuthenticated,
            setFieldErrors,
            navigation
          )
        }
        buttonText="Login"
        fieldErrors={fieldErrors}
      />
    </View>
  );
}

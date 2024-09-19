import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import Form from "../components/Form";
import { handleLogin } from "../handlers/authHandlers";

export default function LoginScreen({ navigation }) {
  const { setAuthenticated } = useContext(AuthContext);

  // Uso de react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const fields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      isPassword: false,
      validation: {
        required: "El Email no puede estar vacío.",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "El Email no es válido.",
        },
      },
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Password",
      isPassword: true,
      validation: {
        required: "La Contraseña no puede estar vacía.",
      },
    },
  ];

  // Función para manejar el login
  const onSubmit = (data) => {
    handleLogin(data, setAuthenticated, setError, navigation);
  };

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
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        buttonText="Login"
      />
    </View>
  );
}

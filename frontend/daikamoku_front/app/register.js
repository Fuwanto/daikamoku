import React from "react";
import { View, Text, Image } from "react-native";
import { useForm } from "react-hook-form";
import { handleRegister } from "../handlers/authHandlers";
import Form from "../components/Form";

export default function RegisterScreen({ navigation }) {
  // Uso de react-hook-form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const fields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      isPassword: false,
      validation: {
        required: "El Email es obligatorio.",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "El formato del Email no es válido.",
        },
      },
    },
    {
      name: "username",
      label: "Usuario",
      placeholder: "Username",
      isPassword: false,
      validation: { required: "El Usuario es obligatorio." },
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Password",
      isPassword: true,
      validation: { required: "La Contraseña es obligatoria." },
    },
    {
      name: "confirmPassword",
      label: "Confirme la contraseña",
      placeholder: "Confirm Password",
      isPassword: true,
      validation: {
        required: "Confirma tu contraseña.",
        validate: (value, { password }) =>
          value === password || "Las contraseñas no coinciden.",
      },
    },
  ];

  // Función para manejar el registro
  const onSubmit = async (data) => {
    handleRegister(data, setError, navigation);
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

      <Form
        fields={fields}
        onSubmit={handleSubmit(onSubmit)} // Pasamos handleSubmit de react-hook-form
        control={control} // Pasamos el control para cada campo
        errors={errors} // Pasamos los errores para cada campo
        buttonText="Registrarse"
      />
    </View>
  );
}

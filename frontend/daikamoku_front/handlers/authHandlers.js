import { login_api, register_api } from "../services/authServices";
import { Alert } from "react-native";

export const handleLogin = async (
  data, // Los datos ya vienen procesados de react-hook-form
  setAuthenticated,
  setError,
  navigation
) => {
  const { email, password } = data;
  const result = await login_api(email, password);

  if (result.success) {
    setAuthenticated(true);
    navigation.navigate("index");
  } else {
    Object.keys(result.errors).forEach((key) => {
      setError(key, { type: "manual", message: result.errors[key] });
    });
  }
};

export const handleRegister = async (
  data, // Los datos ya vienen procesados de react-hook-form
  setError, // Método para establecer errores manualmente
  navigation
) => {
  const { email, username, password, confirmPassword } = data;

  const result = await register_api(email, password, confirmPassword, username);

  if (result.success) {
    Alert.alert(
      "Success",
      "Registro exitoso. Revisa tu correo para confirmar tu cuenta."
    );
    navigation.navigate("login");
  } else {
    Object.keys(result.errors).forEach((field) => {
      setError(field, { type: "manual", message: result.errors[field] });
    });
  }
};

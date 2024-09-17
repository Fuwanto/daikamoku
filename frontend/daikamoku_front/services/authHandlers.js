import { login_api, register_api } from "./auth_services";
import { Alert } from "react-native";

export const handleLogin = async (
  email,
  password,
  setAuthenticated,
  setFieldErrors,
  navigation
) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!email.trim()) {
    errors.email = "El Email no puede estar vacío.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El Email no es válido.";
  }

  if (!password.trim()) {
    errors.password = "La Contraseña no puede estar vacía.";
  }

  setFieldErrors(errors);

  if (Object.values(errors).some((error) => error !== "")) {
    return;
  }

  const result = await login_api(email, password);

  if (result.success) {
    Alert.alert("Success", "Login successful!");
    setAuthenticated(true);
    navigation.navigate("index");
  } else {
    setFieldErrors(result.errors);
  }
};

export const handleRegister = async (
  email,
  username,
  password,
  confirmPassword,
  setFieldErrors,
  navigation
) => {
  const errors = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (!email.trim()) {
    errors.email = "El Email no puede estar vacío.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El Email no es válido.";
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
    errors.password = "Las contraseñas no coinciden.";
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  setFieldErrors(errors);

  if (Object.values(errors).some((error) => error !== "")) {
    return;
  }

  const result = await register_api(email, password, confirmPassword, username);

  if (result.success) {
    Alert.alert(
      "Success",
      "Registration successful! Please check your email to confirm your account."
    );
    navigation.navigate("login");
  } else {
    setFieldErrors(result.errors);
  }
};

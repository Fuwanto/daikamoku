import { login_api, register_api } from "../../services/authServices";
import { Alert } from "react-native";
import { validateEmail, validatePassword } from "../validators/authValidators";

export const handleErrors = (errors, setFieldErrors) => {
  setFieldErrors(errors);
  return Object.values(errors).some((error) => error !== "");
};

export const handleLogin = async (
  email,
  password,
  setAuthenticated,
  setFieldErrors,
  navigation
) => {
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (handleErrors(errors, setFieldErrors)) return;

  const result = await login_api(email, password);
  console.log("Login Result:", result);

  if (result.success) {
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
    email: validateEmail(email),
    username: !username.trim() ? "El Usuario no puede estar vacío." : "",
    password: validatePassword(password),
    confirmPassword: !confirmPassword.trim()
      ? "La Confirmación de la Contraseña no puede estar vacía."
      : "",
  };

  if (password !== confirmPassword) {
    errors.password = errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  if (handleErrors(errors, setFieldErrors)) return;

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

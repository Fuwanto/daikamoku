export const validateEmail = (email) => {
  if (!email.trim()) {
    return "El Email no puede estar vacío.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "El Email no es válido.";
  }
  return "";
};
export const validatePassword = (password) => {
  if (!password.trim()) {
    return "La Contraseña no puede estar vacía.";
  }
  return "";
};

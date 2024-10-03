import {
  apiService,
  setAuthToken,
  storeToken,
  getStoredToken,
  removeToken,
} from "./apiServices";

export async function isAuthenticated() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
      const response = await apiService.post("/refresh-token/");
      if (response.status === 200) {
        await storeToken(response.data.access); // Actualiza los tokens almacenados
        setAuthToken(response.data.access);
        return true;
      } else {
        removeToken();
        return false;
      }
    }
  } catch (error) {
    removeToken();
    return false;
  }
}

export async function register_api(
  email,
  password,
  confirm_password,
  username
) {
  try {
    const response = await apiService.post("/register/", {
      email,
      password,
      confirm_password,
      username,
    });

    if (response.status === 201) {
      return { success: true };
    }
  } catch (error) {
    if (error.response?.data) {
      return { success: false, errors: error.response.data };
    }
    return { success: false, errors: { general: error.message } };
  }
}

export async function login_api(email, password) {
  try {
    const response = await apiService.post("/login/", {
      email,
      password,
    });

    if (response.status === 200) {
      const { access } = response.data;
      await storeToken(access);
      setAuthToken(access);
      return { success: true };
    }
  } catch (error) {
    if (error.response?.data) {
      return { success: false, errors: error.response.data };
    }
    return { success: false, errors: { general: error.message } };
  }
}

export async function logout_api() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
      const response = await apiService.post("/logout/");
      if (response.status === 200) {
        await removeToken();
        return { success: true };
      }
    }
  } catch (error) {
    if (error.response?.data) {
      return { success: false, errors: error.response.data };
    }
    return { success: false, errors: { general: error.message } };
  }
}

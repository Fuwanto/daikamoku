/*import axios from "axios";
import * as Keychain from "react-native-keychain";

const BASE_URL = "";

const apiService = axios.create({
  baseURL: BASE_URL,
});

async function setAuthToken(token) {
  apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function storeTokens(accessToken, refreshToken) {
  try {
    await Keychain.setGenericPassword("accessToken", accessToken);
    await Keychain.setGenericPassword("refreshToken", refreshToken);
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
}

async function getStoredToken() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
      const response = await apiService.post("/refresh-token/");
      if (response.status === 200) {
        return true;
      }
    }
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function register_api(email, password, confirmPassword, username) {
  try {
    const response = await apiService.post("/register/", {
      email,
      password,
      confirmPassword,
      username,
    });
    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function login_api(email, password) {
  try {
    const response = await apiService.post("/login/", {
      email,
      password,
    });

    if (response.status === 200) {
      const { access, refresh } = response.data;
      await storeTokens(access, refresh);
      setAuthToken(access);
      return true;
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return false;
  }
}

export async function logout_api() {
  try {
    const response = await apiService.post("/logout/");
    if (response.status === 200) {
      await Keychain.resetGenericPassword(); // Elimina los tokens
      return true;
    }
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    return false;
  }
}*/ //for production

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://wthdj5mh-8000.brs.devtunnels.ms";

const apiService = axios.create({
  baseURL: BASE_URL,
});

async function setAuthToken(token) {
  apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function storeTokens(accessToken, refreshToken) {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
}

async function getStoredToken() {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const token = await getStoredToken();
    if (token) {
      const response = await apiService.post(
        "/refresh-token/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        await storeTokens(response.data.access, response.data.refresh); // Actualiza los tokens almacenados
        setAuthToken(response.data.access);
        return true;
      }
    }
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
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
      const { access, refresh } = response.data;
      await storeTokens(access, refresh);
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
      const response = await apiService.post("/logout/", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        await AsyncStorage.removeItem("accessToken");
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

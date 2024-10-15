import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

const BASE_URL = process.env.API_URL;

const apiService = axios.create({
  baseURL: BASE_URL,
});

async function setAuthToken(token) {
  apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function storeToken(accessToken) {
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

async function removeToken() {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error removing tokens:", error);
  }
}

export { apiService, setAuthToken, storeToken, getStoredToken, removeToken };

import { Text, Alert, TouchableOpacity } from "react-native";
import { logout_api } from "../services/authServices";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    const success = await logout_api();
    if (success) {
      setAuthenticated(false);
      Alert.alert("Success", "Logout successful.");
    } else {
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      className="text-2xl text-white font-bold text-center"
    >
      <Text className="bg-red-500 text-white py-3 rounded-full text-center shadow-lg transition duration-300 hover:bg-red-400">
        Logout
      </Text>
    </TouchableOpacity>
  );
}

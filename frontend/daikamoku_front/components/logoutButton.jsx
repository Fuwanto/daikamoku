import { Text, View, Alert, TouchableOpacity } from "react-native";
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
    <View className="m-4">
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 p-3 rounded-lg shadow-md"
      >
        <Text className="text-white font-semibold text-center text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

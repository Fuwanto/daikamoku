import { Text, View, Alert, Pressable } from "react-native";
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
    <View>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

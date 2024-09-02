import { Text, View, Alert, Button } from "react-native";
import { logout_api } from "../services/auth_services";

export default function Start() {
  const handleLogout = async () => {
    const isLoggedOut = await logout_api();

    if (isLoggedOut) {
      Alert.alert("Logout successful", "You are logged out!");
    } else {
      Alert.alert("Logout failed", "An error occurred while logging out.");
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}

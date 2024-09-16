import { Text, View, Alert, Button } from "react-native";
import { logout_api } from "../services/auth_services";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Start({ navigation }) {
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
      <Text>Welcome to Daikamoku!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

// make logout bottom component

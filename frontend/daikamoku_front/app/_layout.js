import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f8f8f8" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </SafeAreaProvider>
  );
}

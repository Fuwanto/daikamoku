import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import NoLogin from "../components/noLogin";
import { isAuthenticated } from "../services/auth_services";
import Start from "../components/Start";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await isAuthenticated();
        setAuthenticated(result);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  if (authenticated === null) {
    return (
      <View className="flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">{authenticated ? <Start /> : <NoLogin />}</View>
  );
}

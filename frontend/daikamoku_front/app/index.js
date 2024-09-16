import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import NoLogin from "../components/noLogin";
import { AuthContext } from "../context/AuthContext";
import Start from "./Start";

export default function Index() {
  const { authenticated } = useContext(AuthContext);

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

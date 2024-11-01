import React, { useContext } from "react";
import { View } from "react-native";
import NoLogin from "../components/noLogin";
import { AuthContext } from "../context/AuthContext";
import Start from "./Start";
import LoadingIndicator from "../components/loadingIndicator";

export default function Index() {
  const { authenticated } = useContext(AuthContext);

  if (authenticated === null) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1">{authenticated ? <Start /> : <NoLogin />}</View>
  );
}

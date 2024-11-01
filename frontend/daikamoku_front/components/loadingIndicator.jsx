import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-900 rounded-lg">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default LoadingIndicator;

import React from "react";
import { View, Text } from "react-native";

const StateStyle = ({ state }) => {
  // Mapeo de colores según el estado
  const colorMapping = {
    Aprobada: "bg-green-900",
    Cursando: "bg-violet-900",
    "No cursada": "bg-gray-500",
    Cursada: "bg-orange-900",
  };

  const bgColor = colorMapping[state] || "bg-gray-700"; // Color por defecto

  return (
    <View className={`flex-1 px-2 py-1 mr-2 rounded ${bgColor}`}>
      <Text className="text-white font-semibold text-xs text-center">{`Estado: ${state}`}</Text>
    </View>
  );
};

export default StateStyle;

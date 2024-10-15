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
    <View className={`mb-2 border rounded ${bgColor}`}>
      <Text className="text-white font-semibold">{`Estado: ${state}`}</Text>
    </View>
  );
};

export default StateStyle;

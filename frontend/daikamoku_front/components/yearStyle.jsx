import React from "react";
import { View, Text } from "react-native";

const YearStyle = ({ year }) => {
  // Mapeo de colores según el año
  const colorMapping = {
    1: "bg-teal-300",
    2: "bg-teal-600",
    3: "bg-teal-900",
    4: "bg-cyan-600",
    5: "bg-cyan-900",
  };

  const bgColor = colorMapping[year] || "bg-gray-500"; // Color por defecto

  return (
    <View className={`mb-2 border rounded ${bgColor}`}>
      <Text className="text-white font-semibold">{`${year}°`}</Text>
    </View>
  );
};

export default YearStyle;

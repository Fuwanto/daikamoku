import React from "react";
import { View, Text } from "react-native";

const StateStyle = ({ state }) => {
  // Mapeo de colores según el estado
  const colorMapping = {
    Aprobada: "bg-green-800", // Color verde más profundo
    Cursando: "bg-purple-700", // Color púrpura más suave
    "No cursada": "bg-gray-600", // Color gris moderado
    Cursada: "bg-orange-600", // Color naranja más brillante
  };

  const textColorMapping = {
    Aprobada: "text-white", // Texto blanco para contraste
    Cursando: "text-white", // Texto blanco para contraste
    "No cursada": "text-white", // Texto blanco para contraste
    Cursada: "text-white", // Texto blanco para contraste
  };

  const bgColor = colorMapping[state] || "bg-gray-800"; // Color por defecto
  const textColor = textColorMapping[state] || "text-white"; // Color de texto por defecto

  return (
    <View className={`flex-1 px-4 py-2 mr-2 rounded-lg shadow ${bgColor}`}>
      <Text className={`${textColor} font-semibold text-sm text-center`}>
        {`Estado: ${state}`}
      </Text>
    </View>
  );
};

export default StateStyle;

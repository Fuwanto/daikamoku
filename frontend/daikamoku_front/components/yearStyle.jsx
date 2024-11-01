import React from "react";
import { View, Text } from "react-native";

const YearStyle = ({ year }) => {
  // Mapeo de colores según el año
  const colorMapping = {
    1: "bg-indigo-200", // Suave
    2: "bg-indigo-400", // Intermedio
    3: "bg-indigo-600", // Más oscuro
    4: "bg-purple-500", // Un color contrastante
    5: "bg-purple-700", // Profundo
  };

  const textColorMapping = {
    1: "text-gray-800", // Texto oscuro para contraste
    2: "text-gray-800", // Texto oscuro para contraste
    3: "text-white", // Texto blanco para contraste
    4: "text-white", // Texto blanco para contraste
    5: "text-white", // Texto blanco para contraste
  };

  const bgColor = colorMapping[year] || "bg-gray-500"; // Color por defecto
  const textColor = textColorMapping[year] || "text-white"; // Color de texto por defecto

  // Función para obtener la representación ordinal del año
  const getOrdinalYear = (year) => {
    if (year === 1) return "1er año";
    if (year === 2) return "2do año";
    if (year === 3) return "3er año";
    if (year === 4) return "4to año";
    if (year === 5) return "5to año";
    return `${year}° año`; // Para años fuera del rango 1-5
  };

  return (
    <View className={`mb-2 border border-gray-300 rounded-lg p-1 ${bgColor}`}>
      <Text className={`${textColor} font-semibold text-center text-2xl`}>
        {getOrdinalYear(year)}
      </Text>
    </View>
  );
};

export default YearStyle;

import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressCircle = ({ percentage }) => {
  const SIZE = 200;
  return (
    <View className="relative flex justify-center items-center">
      {/* Fondo del círculo */}
      <View
        className="absolute rounded-full"
        style={{
          width: SIZE,
          height: SIZE,
          backgroundColor: "#1E1E1E", // Color de fondo oscuro
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SIZE / 2, // Asegura que sea un círculo perfecto
        }}
      />

      {/* Círculo de progreso */}
      <Progress.Circle
        size={SIZE}
        progress={percentage / 100}
        thickness={15} // Grosor del círculo (más ancho)
        color="#4CAF50" // Color del progreso (verde)
        unfilledColor="#BDBDBD" // Color de la parte no llenada
        borderWidth={5} // Borde del círculo
        borderColor="#1E1E1E" // Color del borde
        showsText={true}
        formatText={() => `${percentage}%`} // Texto dentro del círculo
        textStyle={{
          fontSize: SIZE / 6,
          color: "#FFFFFF", // Color del texto
          fontWeight: "bold",
        }} // Estilo del texto
      />
    </View>
  );
};

export default ProgressCircle;

import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressCircle = ({ percentage }) => {
  const SIZE = 200;
  return (
    <View className="relative flex justify-center items-center ">
      {/* Fondo del círculo */}
      <View
        className="absolute rounded-full"
        style={{
          width: SIZE, // Tamaño del círculo
          height: SIZE, // Tamaño del círculo
          backgroundColor: "white", // Color de fondo
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>

      {/* Círculo de progreso */}
      <Progress.Circle
        size={SIZE} // Tamaño del círculo
        progress={percentage / 100}
        thickness={25} // Grosor del círculo
        color="#209D5C" // Color del progreso
        unfilledColor="#06327D" // Color de la parte no llenada
        borderWidth={5} // Sin borde
        borderColor="white"
        showsText={true}
        formatText={() => `${percentage}%`} // Texto dentro del círculo
        textStyle={{
          fontSize: SIZE / 6,
          color: "#06327D",
          fontWeight: "bold",
        }} // Estilo del texto
      />
    </View>
  );
};

export default ProgressCircle;

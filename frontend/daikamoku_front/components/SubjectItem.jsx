import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StateStyle from "./stateStyle";
import YearStyle from "./yearStyle";
import { updateStateSubject } from "../services/facultyServices";

export default function SubjectItem({ subject, career, updatePercentage }) {
  const [selectedState, setSelectedState] = useState(subject.state_subject);

  const handleStateChange = async (itemValue) => {
    try {
      const newPercentage = await updateStateSubject(
        subject.subject_id,
        itemValue,
        career,
        setSelectedState
      );
      updatePercentage(career, newPercentage);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <View className="m-4 p-2 border rounded bg-white">
      <YearStyle year={subject.year} />
      <Text className="text-gray-800 font-semibold">{`Materia: ${subject.subject}`}</Text>

      {/* Contenedor de Estado y Picker en una fila */}
      <View className="flex-row items-center justify-between mt-2">
        <StateStyle state={selectedState} />

        <Picker
          style={{ width: 30, marginLeft: 10 }}
          selectedValue={selectedState}
          onValueChange={handleStateChange}
          dropdownIconColor="#4B5563"
        >
          <Picker.Item label="Aprobada" value="Aprobada" />
          <Picker.Item label="Cursando" value="Cursando" />
          <Picker.Item label="Cursada" value="Cursada" />
          <Picker.Item label="No cursada" value="No cursada" />
        </Picker>
      </View>
    </View>
  );
}

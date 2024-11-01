import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function SubjectProgressList({
  subjects,
  stateSubjects,
  onSubmitProgress,
  onBackPress,
}) {
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const handleProgressSelect = (subjectId, stateSubjectId) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [subjectId]: stateSubjectId,
    }));
  };

  const handleSubmit = () => {
    onSubmitProgress(selectedSubjects);
  };

  const renderSubjectItem = ({ item }) => (
    <View className="p-4 my-2 bg-green-600 rounded-lg shadow-lg">
      <Text className="text-sm font-bold text-white mb-2">{item.name}</Text>
      <FlatList
        data={stateSubjects}
        horizontal
        renderItem={({ item: state }) => (
          <TouchableOpacity
            onPress={() => handleProgressSelect(item.id, state.id)}
            className={`${
              selectedSubjects[item.id] === state.id
                ? "bg-blue-500"
                : "bg-gray-400"
            } py-2 px-4 rounded-md mx-1`}
          >
            <Text className="text-sm font-bold text-white mb-2">
              {state.description}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(state) => state.id.toString()}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4 rounded-lg shadow-md">
      {/* Botón para volver atrás */}
      <TouchableOpacity onPress={onBackPress} className="mb-4">
        <Text className="text-blue-400 text-lg font-bold">← Volver</Text>
      </TouchableOpacity>

      <FlatList
        data={subjects}
        renderItem={renderSubjectItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle="p-2"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-700 text-white py-3 rounded-lg shadow-lg mt-4"
      >
        <Text className="text-center font-bold">Enviar Progreso</Text>
      </TouchableOpacity>
    </View>
  );
}

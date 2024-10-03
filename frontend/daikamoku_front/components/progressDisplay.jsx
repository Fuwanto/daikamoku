import React from "react";
import { Text, View, FlatList } from "react-native";

const ProgressDisplay = ({ progress }) => {
  const careerProgress = progress.career_progress || []; // Suponemos que "progress" ahora es un array de carreras.

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <FlatList
        data={careerProgress}
        keyExtractor={(item) => item.career} // Suponiendo que el nombre de la carrera es único.
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border rounded bg-white shadow">
            <Text className="text-2xl font-bold mb-2 text-gray-800">
              Your Progress in {item.career}
            </Text>

            <FlatList
              data={item.subjects} // Aquí usamos "subjects" para obtener las materias de la carrera.
              keyExtractor={(subject) => subject.subject} // Suponiendo que los nombres de las materias son únicos.
              renderItem={({ item: subject }) => (
                <View className="mb-2 p-4 border rounded bg-gray-200">
                  <Text className="text-gray-800 font-semibold">{`Materia: ${subject.subject}`}</Text>
                  <Text className="text-gray-600">{`Estado: ${subject.state_subject}`}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProgressDisplay;

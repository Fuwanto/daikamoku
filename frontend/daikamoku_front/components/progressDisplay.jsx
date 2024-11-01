import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import ProgressCircle from "./progressCircle";
import SubjectItem from "./SubjectItem";

const ProgressDisplay = ({ progress }) => {
  const [careerProgress, setCareerProgress] = useState(
    progress.career_progress || []
  );

  // Función para actualizar el porcentaje
  const updatePercentage = (career, newPercentage) => {
    setCareerProgress((prev) =>
      prev.map((item) =>
        item.career === career ? { ...item, percentage: newPercentage } : item
      )
    );
  };

  return (
    <FlatList
      className="m-2"
      data={careerProgress}
      keyExtractor={(item) => item.career}
      renderItem={({ item }) => (
        <View className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md">
          <Text className="text-3xl font-bold text-white text-center mb-2">
            {item.career}
          </Text>

          <ProgressCircle percentage={item.percentage} />
          <FlatList
            data={item.subjects.sort((a, b) => a.year - b.year)}
            keyExtractor={(subject) => subject.subject}
            renderItem={({ item: subject }) => (
              <SubjectItem
                subject={subject}
                career={item.career}
                updatePercentage={updatePercentage}
              />
            )}
          />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 10 }}
    />
  );
};

export default ProgressDisplay;

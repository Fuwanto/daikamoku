import React from "react";
import { Text, View, FlatList } from "react-native";
import ProgressCircle from "./progressCircle";
import SubjectItem from "./SubjectItem";

const ProgressDisplay = ({ progress }) => {
  const careerProgress = progress.career_progress || [];

  return (
    <View className="flex-1 flex-col bg-black">
      <FlatList
        data={careerProgress}
        keyExtractor={(item) => item.career}
        renderItem={({ item }) => (
          <View className="mb-4 border rounded bg-black shadow">
            <Text className="text-4xl font-bold text-white text-center pt-6">
              {item.career}
            </Text>
            <Text className="text-4xl font-bold text-white text-center pb-4">
              _______________
            </Text>
            <Text className="text-2xl font-bold text-white text-center pb-4">
              Progreso
            </Text>
            <ProgressCircle percentage={23} />

            <FlatList
              data={item.subjects.sort((a, b) => a.year - b.year)}
              keyExtractor={(subject) => subject.subject}
              renderItem={({ item: subject }) => (
                <SubjectItem subject={subject} />
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProgressDisplay;

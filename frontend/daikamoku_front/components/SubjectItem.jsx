import React from "react";
import { View, Text } from "react-native";
import StateStyle from "./stateStyle";
import YearStyle from "./yearStyle";

export default function SubjectItem({ subject }) {
  return (
    <View className="m-4 p-2 border rounded bg-white">
      <YearStyle year={subject.year} />
      <Text className="text-gray-800 font-semibold">{`Materia: ${subject.subject}`}</Text>
      <StateStyle state={subject.state_subject} />
    </View>
  );
}

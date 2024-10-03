import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";

export default function SubjectProgressList({
  subjects,
  stateSubjects,
  onSubmitProgress,
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
    <View className="p-4 my-2 bg-green-600 rounded-lg">
      <Text className="text-lg font-bold text-white">{item.name}</Text>
      <FlatList
        data={stateSubjects}
        horizontal
        renderItem={({ item: state }) => (
          <TouchableOpacity
            onPress={() => handleProgressSelect(item.id, state.id)}
            style={{
              backgroundColor:
                selectedSubjects[item.id] === state.id ? "blue" : "gray",
              padding: 10,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>{state.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(state) => state.id.toString()}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={subjects}
        renderItem={renderSubjectItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle="p-4"
      />
      <Button title="Submit Progress" onPress={handleSubmit} />
    </View>
  );
}

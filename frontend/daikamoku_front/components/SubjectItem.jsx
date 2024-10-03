import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// Componente optimizado con React.memo
const SubjectItem = React.memo(function SubjectItem({
  item,
  stateSubjects,
  handleProgressSelect,
  selectedSubjects,
}) {
  return (
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
});

export default SubjectItem;

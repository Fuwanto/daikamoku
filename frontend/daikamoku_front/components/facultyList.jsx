import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function FacultyList({ faculties, onFacultyPress }) {
  const renderFacultyItem = ({ item }) => (
    <TouchableOpacity onPress={() => onFacultyPress(item.id)}>
      <View className="p-4 my-2 bg-blue-600 rounded-lg shadow-lg">
        <Text className="text-lg font-bold text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={faculties}
      renderItem={renderFacultyItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle="p-4"
    />
  );
}

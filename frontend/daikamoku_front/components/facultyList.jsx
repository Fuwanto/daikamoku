import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function FacultyList({ faculties, onFacultyPress }) {
  const renderFacultyItem = ({ item }) => (
    <TouchableOpacity onPress={() => onFacultyPress(item.id)}>
      <View className="flex-row items-center justify-between p-4 my-2 bg-blue-700 rounded-lg shadow-lg transition duration-300 hover:bg-blue-600">
        <Text className="text-lg font-semibold text-white">{item.name}</Text>
        <Text className="text-sm text-gray-300">Ver más</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="">
      <FlatList
        data={faculties}
        renderItem={renderFacultyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle="p-4"
      />
    </View>
  );
}

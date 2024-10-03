import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function CareerList({ careers, onCareerPress }) {
  const renderCareerItem = ({ item }) => (
    <TouchableOpacity onPress={() => onCareerPress(item.id)}>
      <View className="p-4 my-2 mx-4 bg-green-600 rounded-lg shadow-lg">
        <Text className="text-lg font-bold text-white">{item.name}</Text>
        <Text className="text-sm text-gray-200">Plan: {item.plan}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={careers}
      renderItem={renderCareerItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle="p-4"
      ListEmptyComponent={
        <Text className="text-center text-gray-500">
          No hay carreras disponibles.
        </Text>
      }
    />
  );
}

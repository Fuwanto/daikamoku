import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getFaculties, getFacultyCareers } from "../services/facultyServices";

const FacultyAndCareerList = () => {
  const [faculties, setFaculties] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      const data = await getFaculties();
      if (data) {
        setFaculties(data.faculties);
      }
      setLoading(false);
    };

    fetchFaculties();
  }, []);

  const handleFacultyPress = async (facultyId) => {
    setSelectedFacultyId(facultyId);
    const careersData = await getFacultyCareers(facultyId);
    if (careersData) {
      setCareers(careersData.careers);
    } else {
      setCareers([]);
    }
  };

  const renderFacultyItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleFacultyPress(item.id)}>
      <View className="p-4 my-2 bg-blue-600 rounded-lg shadow-lg">
        <Text className="text-lg font-bold text-white">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCareerItem = ({ item }) => (
    <View className="p-4 my-2 mx-4 bg-green-600 rounded-lg shadow-lg">
      <Text className="text-lg font-bold text-white">{item.name}</Text>
      <Text className="text-sm text-gray-200">Plan: {item.plan}</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={faculties}
        renderItem={renderFacultyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle="p-4"
      />
      {selectedFacultyId && (
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
      )}
    </View>
  );
};

export default FacultyAndCareerList;

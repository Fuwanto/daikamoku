import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import LogoutButton from "../components/logoutButton";
import FacultyAndCareerList from "../components/facultyAndCareerList";
import ProgressDisplay from "../components/progressDisplay";
import { getProgress } from "../services/facultyServices";

export default function Start({ navigation }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await getProgress();
      setProgress(data);
      setLoading(false);
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-6 text-gray-800">
        Welcome to Daikamoku!
      </Text>

      {progress ? (
        <ProgressDisplay progress={progress} />
      ) : (
        <>
          <Text className="text-lg text-gray-800">
            You have no progress yet.
          </Text>
          <FacultyAndCareerList />
        </>
      )}

      <LogoutButton />
    </View>
  );
}

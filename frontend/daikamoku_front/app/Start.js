import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import LogoutButton from "../components/logoutButton";
import FacultyAndCareerList from "../components/facultyAndCareerList";
import ProgressDisplay from "../components/progressDisplay";
import LoadingIndicator from "../components/loadingIndicator";
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
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1 flex-col bg-black p-6">
      {progress ? (
        <ProgressDisplay progress={progress} />
      ) : (
        <>
          <Image
            className="w-28 h-28 border-4 border-blue-600 shadow-lg mx-auto mt-5 mb-5"
            source={require("../assets/formulario.png")}
          />

          <Text className="text-2xl text-white mb-4 font-bold text-center bg-slate-500 rounded-lg">
            No tienes un seguimiento de progreso aún.
          </Text>
          <FacultyAndCareerList />
        </>
      )}

      <LogoutButton />
    </View>
  );
}

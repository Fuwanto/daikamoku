import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  getSubjectsByCareer,
  getStateSubjects,
  updateCareerProgress,
} from "../services/progressServices";
import { getFaculties, getFacultyCareers } from "../services/facultyServices";
import CareerList from "./careerList";
import FacultyList from "./facultyList";
import SubjectProgressList from "./subjectProgressList";
import LoadingIndicator from "./loadingIndicator";

export default function FacultyAndCareerList({ navigation }) {
  // Recibe la prop navigation
  const [faculties, setFaculties] = useState([]);
  const [careers, setCareers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [stateSubjects, setStateSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [selectedCareerId, setSelectedCareerId] = useState(null);

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

  const handleCareerPress = async (careerId) => {
    setSelectedCareerId(careerId);
    setLoading(true);
    const subjectsData = await getSubjectsByCareer(careerId);
    const stateSubjectsData = await getStateSubjects();
    setSubjects(subjectsData.subjects);
    setStateSubjects(stateSubjectsData.state_subjects);
    setLoading(false);
  };

  const handleSubmitProgress = async (selectedSubjects) => {
    const formattedSubjects = Object.entries(selectedSubjects).map(
      ([subjectId, stateSubjectId]) => ({
        subject: subjectId,
        state_subject: stateSubjectId,
        career: selectedCareerId,
      })
    );
    const response = await updateCareerProgress({
      subjects: formattedSubjects,
    });
    if (response.success) {
      alert("Progress updated successfully!");
    } else {
      alert("Error updating progress.");
    }
  };

  const handleBackPress = () => {
    if (selectedCareerId) {
      setSelectedCareerId(null); // Volver a la selección de carreras
      setSelectedFacultyId(null); // Volver a la selección de facultades
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1 bg-gray-900 rounded-lg p-4">
      {/* Listado de Facultades */}
      {!selectedFacultyId && (
        <FacultyList
          faculties={faculties}
          onFacultyPress={handleFacultyPress}
        />
      )}

      {/* Listado de Carreras de la facultad seleccionada */}
      {selectedFacultyId && !selectedCareerId && (
        <CareerList careers={careers} onCareerPress={handleCareerPress} />
      )}

      {/* Listado de Materias y selección de progreso */}
      {selectedCareerId && (
        <SubjectProgressList
          subjects={subjects}
          stateSubjects={stateSubjects}
          onSubmitProgress={handleSubmitProgress}
          onBackPress={handleBackPress} // Pasa la función de regreso
        />
      )}
    </View>
  );
}

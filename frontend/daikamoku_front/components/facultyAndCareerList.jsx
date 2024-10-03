import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  getSubjectsByCareer,
  getStateSubjects,
  updateCareerProgress,
} from "../services/progressServices";
import { getFaculties, getFacultyCareers } from "../services/facultyServices";
import CareerList from "./careerList";
import FacultyList from "./facultyList";
import SubjectProgressList from "./subjectProgressList";

export default function FacultyAndCareerList() {
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
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
        />
      )}
    </View>
  );
}

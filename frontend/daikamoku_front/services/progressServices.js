import { apiService, setAuthToken, getStoredToken } from "./apiServices";

export async function getSubjectsByCareer(careerId) {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);

      const response = await apiService.get(`/careers/${careerId}/subjects/`);
      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (error) {
    return null;
  }
}

export async function getStateSubjects() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);

      const response = await apiService.get(`/state-subjects/`);
      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (error) {
    return null;
  }
}

export async function updateCareerProgress(subjectsData) {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
      const response = await apiService.post(`career-progress/update/`, {
        subjects: subjectsData,
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
    }
  } catch (error) {
    return null;
  }
}

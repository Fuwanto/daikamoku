import { apiService, setAuthToken, getStoredToken } from "./apiServices";

export async function getFaculties() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);

      const response = await apiService.get("/faculties/");
      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (error) {
    return null;
  }
}

export async function getFacultyCareers(facultyId) {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
    }

    const response = await apiService.get(`/faculties/${facultyId}/careers/`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
}

export async function getProgress() {
  try {
    const token = await getStoredToken();
    if (token) {
      setAuthToken(token);
    }

    const response = await apiService.get(`/career-progress/`);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

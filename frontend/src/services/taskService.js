import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const extractMessage = (error) => {
  return error.response?.data?.message || "Something went wrong. Please try again.";
};

export const getTasks = async (filters) => {
  try {
    const response = await api.get("/tasks", { params: filters });
    return response.data.data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const createTask = async (payload) => {
  try {
    const response = await api.post("/tasks", payload);
    return response.data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const updateTask = async (taskId, payload) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const completeTask = async (taskId) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/complete`);
    return response.data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

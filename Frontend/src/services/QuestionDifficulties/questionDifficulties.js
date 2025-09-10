import api from "../config";

export const getAllQuestionDifficulties = async () => {
  const response = await api.get(`/difficulties`);
  return response.data;
};

export const getQuestionDifficultyById = async (id) => {
  const response = await api.get(`/difficulties/${id}`);
  return response.data;
};

export const createQuestionDifficulty = async (questionDifficulty) => {
  const response = await api.post(`/difficulties`, questionDifficulty);
  return response.data;
};

export const updateQuestionDifficulty = async (id, questionDifficulty) => {
  const response = await api.put(`/difficulties/${id}`, questionDifficulty);
  return response.data;
};

export const deleteQuestionDifficulty = async (id) => {
  const response = await api.delete(`/difficulties/${id}`);
  return response.data;
};

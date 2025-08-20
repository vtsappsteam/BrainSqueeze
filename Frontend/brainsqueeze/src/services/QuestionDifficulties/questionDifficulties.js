import api from "../config";

export const getAllQuestionDifficulties = async () => {
  const response = await api.get(`/question-difficulties`);
  return response.data;
};

export const getQuestionDifficultyById = async (id) => {
  const response = await api.get(`/question-difficulties/${id}`);
  return response.data;
};

export const createQuestionDifficulty = async (questionDifficulty) => {
  const response = await api.post(`/question-difficulties`, questionDifficulty);
  return response.data;
};

export const updateQuestionDifficulty = async (id, questionDifficulty) => {
  const response = await api.put(
    `/question-difficulties/${id}`,
    questionDifficulty
  );
  return response.data;
};

export const deleteQuestionDifficulty = async (id) => {
  const response = await api.delete(`/question-difficulties/${id}`);
  return response.data;
};

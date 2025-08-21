import api from "../config";

export const getAllQuestions = async (param) => {
  const response = await api.get(
    `/questions?page=${param.page}&limit=${param.limit}`
  );
  return response.data;
};

export const getQuestionById = async (id) => {
  const response = await api.get(`/questions/${id}`);
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await api.post("/questions", question);
  return response.data;
};

export const updateQuestion = async (id, question) => {
  const response = await api.put(`/questions/${id}`, question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
};

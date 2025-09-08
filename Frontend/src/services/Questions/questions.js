import api from "../config";

export const getAllQuestions = async (param) => {
  const params = new URLSearchParams();

  Object.entries(param).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });
  const response = await api.get(`/questions?${params.toString()}`);
  return response.data;
};

export const exportQuestions = async (param) => {
  const params = new URLSearchParams();

  Object.entries(param).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });
  const response = await api.get(`/questions/exportRaw?${params.toString()}`, {
    responseType: "blob",
  });
  return response.data;
};

export const importQuestions = async (formData) => {
  const response = await api.post("/questions/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

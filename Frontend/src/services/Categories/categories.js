import api from "../config";

export const getAllCategories = async (param) => {
  const response = await api.get(
    `/categories?page=${param.page}&limit=${param.limit}`
  );
  return response.data;
};

export const getAllCategoriesWithDifficulties = async (param) => {
  const params = new URLSearchParams();

  Object.entries(param).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });
  const response = await api.get(
    `/categories/withDifficulties?${params.toString()}`
  );
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await api.post("/categories", category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

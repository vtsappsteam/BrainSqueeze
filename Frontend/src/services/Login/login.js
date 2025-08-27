import api from "../config";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const changePassword = async (credentials) => {
  try {
    const response = await api.post("/changePassword", credentials);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response;
  } catch (error) {
    console.error("Change password failed:", error);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const response = await api.post("/register", credentials);
    localStorage.clear();
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("firstName", response.data.firstName);
    localStorage.setItem("lastName", response.data.lastName);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/logout");
  } catch (e) {
    console.error("Logout request failed:", e);
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  window.location.href = "/login";
};

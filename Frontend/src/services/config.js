import axios from "axios";

// Odredi baseURL u zavisnosti od mode
let baseURL = "";

let okruzenje = "production";
//let okruzenje = "development"; // Promeni na 'production' za produkciju

if (okruzenje === "development") {
  // Development URL
  baseURL = "http://localhost:1000";
} else {
  // Production URL (nakon build-a)
  baseURL = "http://160.99.40.212:1000";
}

console.log("Axios baseURL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post(baseURL + "/refreshToken", {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);
        isRefreshing = false;
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

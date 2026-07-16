import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://mini-project-2-backend.onrender.com/api",
  timeout: 15000,
});

// Normalizes backend error shapes into a single readable message so
// components can just render `error.message`.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === "ECONNABORTED"
        ? "Request timed out. Please try again."
        : "Network error. Check your connection and try again.");
    return Promise.reject({ ...error, message, statusCode: error.response?.status });
  }
);

export const githubApi = {
  getProfile: (username) => api.get(`/github/${username}`).then((r) => r.data.data),
  getRepos: (username) => api.get(`/github/${username}/repos`).then((r) => r.data.data),
};

export const historyApi = {
  list: () => api.get("/history").then((r) => r.data.data),
  add: (username) => api.post("/history", { username }).then((r) => r.data.data),
  remove: (id) => api.delete(`/history/${id}`).then((r) => r.data.data),
};

export const favoritesApi = {
  list: () => api.get("/favorites").then((r) => r.data.data),
  add: (payload) => api.post("/favorites", payload).then((r) => r.data.data),
  remove: (username) => api.delete(`/favorites/${username}`).then((r) => r.data.data),
};

export default api;

import axios from "axios";

let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Auto-correct local development URLs to avoid SSL protocol errors
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  if (baseUrl.startsWith("https://")) {
    baseUrl = baseUrl.replace(/^https:\/\//i, "http://");
  }
  if (!baseUrl.endsWith("/api")) {
    baseUrl = baseUrl.replace(/\/+$/, "") + "/api";
  }
}

const API = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // 🔥 IMPORTANT
});

// Interceptor to handle expired access tokens
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet, and it's not the login request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/login")
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        await axios.post(
          `${API.defaults.baseURL}/users/refresh`,
          {},
          { withCredentials: true }
        );
        // Retry the original request
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid. Redirecting to login.", refreshError);
        // Redirect to admin login page to re-authenticate (only if not already there)
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
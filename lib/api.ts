import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://recotest.pythonanywhere.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if available
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token")
//       }
//     }
//     return Promise.reject(error)
//   },
// )

// API functions
export const apiService = {
  // Get users

  // Get apps with parameters
  getApps: (params: {
    appName: string;
    category: string;
    pageNumber: number;
    pageSize: number;
  }) => api.put("/api/v1/app-service/get-apps", params),
};

export default api

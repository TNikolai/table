import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
    }
    return Promise.reject(error)
  },
)

// API functions
export const apiService = {
  // Get users
  getUsers: () => api.get("/users"),

  // Get posts
  getPosts: () => api.get("/posts"),

  // Get user by ID
  getUserById: (id: number) => api.get(`/users/${id}`),

  // Create post
  createPost: (data: { title: string; body: string; userId: number }) => api.post("/posts", data),

  // Update post
  updatePost: (id: number, data: { title: string; body: string }) => api.put(`/posts/${id}`, data),

  // Delete post
  deletePost: (id: number) => api.delete(`/posts/${id}`),
}

export default api

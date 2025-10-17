import axios from "axios";
import { get } from "lodash";

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_UNSPLASH_API_URL || "https://api.unsplash.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add client-key parameter
apiClient.interceptors.request.use(
  (config) => {
    // Add client-key as query parameter for Unsplash API
    if (!config.params) {
      config.params = {};
    }
    config.params["client_id"] = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      status: get(error, "response.status"),
      response: get(error, "response.data"),
      message: get(error, "response.data.Error.message"),
    });
  }
);

import axios from "axios";

const instance = axios.create({
  baseURL: "https://event-reminder-1z71.onrender.com",
  withCredentials: true,
});

// Add a request interceptor to attach the token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token from responses
instance.interceptors.response.use(
  (response) => {
    // If the response contains a token, save it to localStorage
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    // If we get a 401, clear the token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;

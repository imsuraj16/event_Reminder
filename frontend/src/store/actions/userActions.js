import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiconfig";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/register", credentials);
      // Token is automatically saved by axios interceptor
      return data.user;
    } catch (error) {
      console.error(error);

      let serverErrorMsg = "Registration failed";

      const errorsArray = error.response?.data?.errors;

      if (Array.isArray(errorsArray) && errorsArray.length > 0) {
        serverErrorMsg = errorsArray.map((err) => err.msg).join(" | ");
      } else if (error.response?.data?.message) {
        serverErrorMsg = error.response.data.message;
      }

      return rejectWithValue(serverErrorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      // Token is automatically saved by axios interceptor
      return data.user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      // Check if token exists before making the request
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue("No token found");
      }
      const { data } = await axios.get("/api/auth/profile");
      return data.user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout");
      // Clear token from localStorage
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      console.error(error);
      // Clear token even if logout request fails
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

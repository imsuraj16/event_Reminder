import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiconfig";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/events");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/events", eventData);
      return data.data;
    } catch (error) {
      const errorsArray = error.response?.data?.errors;
      let serverErrorMsg = "Failed to create event";

      if (Array.isArray(errorsArray) && errorsArray.length > 0) {
        serverErrorMsg = errorsArray.map((err) => err.msg).join(" | ");
      } else if (error.response?.data?.message) {
        serverErrorMsg = error.response.data.message;
      }
      return rejectWithValue(serverErrorMsg);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/events/${eventId}`, eventData);
      return data.data;
    } catch (error) {
      const errorsArray = error.response?.data?.errors;
      let serverErrorMsg = "Failed to update event";

      if (Array.isArray(errorsArray) && errorsArray.length > 0) {
        serverErrorMsg = errorsArray.map((err) => err.msg).join(" | ");
      } else if (error.response?.data?.message) {
        serverErrorMsg = error.response.data.message;
      }
      return rejectWithValue(serverErrorMsg);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete event"
      );
    }
  }
);

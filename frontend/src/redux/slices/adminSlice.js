import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

// ================= FETCH USERS =================
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, authHeader());
      return response.data; // expecting array of users
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to fetch users",
      });
    }
  }
);

// ================= ADD USER =================
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        userData,
        authHeader()
      );

      return response.data; // returning created user directly
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to add user",
      });
    }
  }
);

// ================= UPDATE USER =================
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { name, email, role },
        authHeader()
      );

      return response.data; // returning updated user directly
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to update user",
      });
    }
  }
);

// ================= DELETE USER =================
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader());
      return id; // return deleted id
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to delete user",
      });
    }
  }
);

// ================= SLICE =================
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== FETCH USERS =====
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      })

      // ===== ADD USER =====
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      })

      // ===== UPDATE USER =====
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload;

        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      })

      // ===== DELETE USER =====
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      });
  },
});

export default adminSlice.reducer;
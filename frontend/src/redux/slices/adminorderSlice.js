import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// ================= FETCH ALL ORDERS =================
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data; // ✅ important
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed to fetch orders",
      });
    }
  }
);

// ================= UPDATE ORDER STATUS =================
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data; // updated order
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed to update order",
      });
    }
  }
);

// ================= DELETE ORDER =================
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return id;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed to delete order",
      });
    }
  }
);

// ================= SLICE =================
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== FETCH ORDERS =====
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // calculate total sales
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      })

      // ===== UPDATE ORDER STATUS =====
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      // ===== DELETE ORDER =====
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );

        state.totalOrders = state.orders.length;

        state.totalSales = state.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      });
  },
});

export default adminOrderSlice.reducer;
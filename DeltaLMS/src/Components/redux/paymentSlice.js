// src/redux/paymentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for payment
const initialState = {
  clientSecret: null,
  paymentStatus: null,
  error: null,
};

// Async thunk for creating a payment
export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async ({ userId, planType }, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        'http://localhost:5000/onboard/create-payment',
        { userId, planType }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Async thunk for handling subscription
export const handleSubscription = createAsyncThunk(
  'payment/handleSubscription',
  async ({ userId, planType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/onboard/handle-subscription',
        { userId, planType }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPayment: (state) => {
      state.clientSecret = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
        state.paymentStatus = 'success';
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.paymentStatus = 'failed';
      })
      .addCase(handleSubscription.pending, (state) => {
        state.error = null;
      })
      .addCase(handleSubscription.fulfilled, (state, action) => {
        state.paymentStatus = 'success';
      })
      .addCase(handleSubscription.rejected, (state, action) => {
        state.error = action.payload;
        state.paymentStatus = 'failed';
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

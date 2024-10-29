import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleSubscription } from './paymentSlice';

const initialState = {
  subjectVideos: [],
  books: [],
  mcqs: [],
  loadingVideos: false,
  loadingBooks: false,
  loadingMCQs: false,
  error: null,
  isSubscribed: false,
};

// Fetch videos with authorization token
export const fetchSubjectVideos = createAsyncThunk(
  'videos/fetchSubjectVideos',
  async ({ subjectId, langid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `http://localhost:5000/api/v1/getvideos/${subjectId}/${langid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data; // Return the whole response data
    } catch (error) {
      if (error.response?.status === 404) return rejectWithValue('No videos found for this subject.');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch books with authorization token
export const fetchSubjectBooks = createAsyncThunk(
  'books/fetchSubjectBooks',
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `http://localhost:5000/api/v1/getbooks/${subjectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Received response for books:", response.data);
      // Check for the message in the response
      if (response.data.message === "No books found for this subject.") {
        return []; // Return an empty array if no books are found
      }
      return response.data.books || []; // Ensure you're returning the correct data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Fetch MCQs with authorization token
export const fetchSubjectMCQs = createAsyncThunk(
  'mcqs/fetchSubjectMCQs',
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('Token not found');

      const response = await axios.get(
        `http://localhost:5000/api/v1/mcq/${subjectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.result || []; // Ensure you're returning the correct data
    } catch (error) {
      if (error.response?.status === 404) return rejectWithValue('No MCQs found for this subject.');
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      const { videos, isSubscribed } = action.payload; // Ensure this matches the structure of your API response
      state.subjectVideos = videos;
      state.isSubscribed = isSubscribed;
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
    clearVideos: (state) => { // Add this line
      state.subjectVideos = []; // Clear the videos array
    },
    clearBooks: (state) => {
      state.books = [];
    },
    clearMCQs: (state) => {
      state.mcqs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectVideos.pending, (state) => {
        state.loadingVideos = true;
        state.error = null;
      })
      .addCase(fetchSubjectVideos.fulfilled, (state, action) => {
       

        // Ensure payload is not undefined
        if (action.payload) {
          state.loadingVideos = false;
          state.subjectVideos = action.payload.videos || [];
          state.isSubscribed = action.payload.isSubscribed || false;
        } else {
          // Handle cases where payload might be undefined
          state.loadingVideos = false;
          state.subjectVideos = [];
          state.isSubscribed = false;
        }
      })
      .addCase(fetchSubjectVideos.rejected, (state, action) => {
        state.loadingVideos = false;
        state.error = action.payload;
      })
      .addCase(fetchSubjectBooks.pending, (state) => {
        state.loadingBooks = true;
        state.error = null;
      })
      .addCase(fetchSubjectBooks.fulfilled, (state, action) => {
        state.loadingBooks = false;
        state.books = action.payload;
       
      })
      .addCase(fetchSubjectBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.payload;
      })
      .addCase(fetchSubjectMCQs.pending, (state) => {
        state.loadingMCQs = true;
        state.error = null;
      })
      .addCase(fetchSubjectMCQs.fulfilled, (state, action) => {
        state.loadingMCQs = false;
        state.mcqs = action.payload; // Ensure this matches the data structure from the API
      })
      .addCase(fetchSubjectMCQs.rejected, (state, action) => {
        state.loadingMCQs = false;
        state.error = action.payload;
      })
      .addCase(handleSubscription.fulfilled, (state) => {
        state.isSubscribed = true; // Update isSubscribed when subscription is handled successfully
      });
  },
});

export const { setIsSubscribed, clearBooks, clearMCQs ,clearVideos } = videoSlice.actions;
export default videoSlice.reducer;

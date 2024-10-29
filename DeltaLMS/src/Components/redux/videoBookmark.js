import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const bookmarkVideo = createAsyncThunk(
  'videoBookmark/bookmarkVideo',
  async ({ subjectId, videoId, classId, boardId, languageId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/bookmark',
        { subjectId, videoId, classId, boardId, languageId },
        { headers: getAuthHeader() }
      );
      return { status: response.data.status, videoId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  status: 'idle',
  error: null,
  bookmarkedVideos: [],
};

const videoBookmarkSlice = createSlice({
  name: 'videoBookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookmarkVideo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookmarkVideo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { status, videoId } = action.payload;

        if (status === 'bookmarked') {
          if (!state.bookmarkedVideos.includes(videoId)) {
            state.bookmarkedVideos.push(videoId);
          }
        } else if (status === 'removed') {
          state.bookmarkedVideos = state.bookmarkedVideos.filter(id => id !== videoId);
        }
      })
      .addCase(bookmarkVideo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default videoBookmarkSlice.reducer;

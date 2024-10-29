import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to get video playtime

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
export const updatePlaytime = createAsyncThunk(
  'videoPlaytime/updatePlaytime',
  async ({subjectId, videoId, playTime, classId, boardId, languageId }) => {
    
    const response = await axios.post('http://localhost:5000/api/v1/update_video_time', {

      subjectId,
      videoId,
      playTime,
      classId,
      boardId,
      languageId,
    },{
      headers: getAuthHeader()
    });
    
   
    return response.data;
  }
);

const initialState = {
  playtime: null,  // Store playtime fetched from the API
  status: 'idle',
  error: null,
};

const videoPlaytimeSlice = createSlice({
  name: 'videoPlaytime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getPlaytime cases
    

    // Handle updatePlaytime cases
    builder
      .addCase(updatePlaytime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePlaytime.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(updatePlaytime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default videoPlaytimeSlice.reducer;

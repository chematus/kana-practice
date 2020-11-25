import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiEndpoints = {
  signIn: 'http://localhost:8000/signin',
  signUp: 'http://localhost:8000/signup',
  stats: 'http://localhost:8000/user',
};

const initialState = {
  id: '',
  username: '',
  email: '',
  token: '',
  status: 'idle',
  error: null,
  stats: {
    picker: {
      correct: 0,
      total: 0,
    },
    matcher: {
      correct: 0,
      total: 0,
    },
    canvas: {
      total: 0,
    },
  },
};

export const signUp = createAsyncThunk('user/signUp', async (userData) => {
  const userObj = await axios.post(apiEndpoints.signUp, userData);
  return userObj.data;
});

export const signIn = createAsyncThunk(
  'user/signIn',
  (userData, { rejectWithValue }) =>
    axios
      .post(apiEndpoints.signIn, userData)
      .then((res) => res.payload.data)
      .catch((e) => rejectWithValue(e.response.data)),
);

export const exportStats = createAsyncThunk(
  'user/exportStats',
  async (_, { getState }) => {
    const {
      user: { token, stats },
    } = getState();
    const result = await axios.post(apiEndpoints.stats, stats, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pickerTaskCompleted(state, action) {
      if (action.payload) {
        state.stats.picker.correct++;
      }
      state.stats.picker.total++;
    },
    matcherTaskCompleted(state, action) {
      if (action.payload) {
        state.stats.matcher.correct++;
      }
      state.stats.matcher.total++;
    },
    canvasTaskCompleted(state, action) {
      state.stats.canvas.total++;
    },
    userLoggedOut(state, action) {
      state.username = '';
      state.email = '';
      state.token = '';
      state.id = '';
      state.stats.picker = {
        correct: 0,
        total: 0,
      };
      state.stats.matcher = {
        correct: 0,
        total: 0,
      };
      state.stats.canvas = {
        total: 0,
      };
    },
    flushError(state, action) {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.status = 'processing';
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { username, email, token, _id: id, stats } = action.payload;
      state.username = username;
      state.email = email;
      state.token = token;
      state.id = id;
      state.stats = stats;
    },
    [signUp.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
    },
    [signIn.pending]: (state, action) => {
      state.status = 'processing';
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { username, email, token, _id: id, stats } = action.payload;
      state.username = username;
      state.email = email;
      state.token = token;
      state.id = id;
      state.stats.picker.correct += stats.picker.correct;
      state.stats.picker.total += stats.picker.total;
      state.stats.matcher.correct += stats.matcher.correct;
      state.stats.matcher.total += stats.matcher.total;
      state.stats.canvas.total += stats.canvas.total;
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
    },
    [exportStats.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    },
  },
});

export const {
  matcherTaskCompleted,
  pickerTaskCompleted,
  canvasTaskCompleted,
  userLoggedOut,
  flushError,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUserInfo = (state) => ({
  username: state.user.username,
  email: state.user.email,
});
export const selectUserObj = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectMatcherStats = (state) => state.user.stats.matcher;
export const selectPickerStats = (state) => state.user.stats.picker;
export const selectCanvasStats = (state) => state.user.stats.canvas;
export const selectUserStats = (state) => state.user.stats;
export const selectReqStatus = (state) => state.user.status;
export const selectReqError = (state) => state.user.error;

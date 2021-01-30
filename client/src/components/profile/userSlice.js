import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = process.env.API_URL || 'https://kanapractice-api.tk/user';
const apiEndpoints = {
  signIn: `${apiBaseUrl}/signin`,
  signUp: `${apiBaseUrl}/signup`,
  userInfo: apiBaseUrl,
};

const initialState = {
  username: '',
  email: '',
  isLoggedIn: false,
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
    weakspot: {},
  },
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const autoSignIn = createAsyncThunk(
  'user/autoSignIn',
  async (_, { rejectWithValue }) => {
    return axios
      .get(apiEndpoints.userInfo, {
        headers: getHeaders(),
      })
      .then((res) => res.data)
      .catch((e) => rejectWithValue(e.response.data));
  },
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) =>
    axios
      .post(apiEndpoints.signUp, userData)
      .then((res) => res.data)
      .catch((e) => rejectWithValue(e.response.data)),
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (userData, { rejectWithValue }) =>
    axios
      .post(apiEndpoints.signIn, userData)
      .then((res) => res.data)
      .catch((e) => rejectWithValue(e.response.data)),
);

export const exportStats = createAsyncThunk(
  'user/exportStats',
  async (_, { getState }) => {
    const {
      user: { stats },
    } = getState();
    const result = await axios.post(apiEndpoints.userInfo, stats, {
      headers: getHeaders(),
    });
    return result.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pickerTaskCompleted(state, action) {
      const { isCorrect, kana } = action.payload;
      const list = { ...state.stats.weakspot };
      if (isCorrect) {
        state.stats.picker.correct++;
      } else {
        list[kana] ? list[kana]++ : (list[kana] = 1);
        state.stats.weakspot = list;
      }
      state.stats.picker.total++;
    },
    matcherTaskCompleted(state, action) {
      const { isCorrect, kana } = action.payload;
      const list = { ...state.stats.weakspot };
      if (isCorrect) {
        state.stats.matcher.correct++;
      } else {
        list[kana] ? list[kana]++ : (list[kana] = 1);
        state.stats.weakspot = list;
      }
      state.stats.matcher.total++;
    },
    canvasTaskCompleted(state, action) {
      state.stats.canvas.total++;
    },
    userLoggedOut(state, action) {
      localStorage.clear();
      state.username = '';
      state.email = '';
      state.isLoggedIn = false;
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
      state.stats.weakspot = {};
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
      const { username, email, token, stats } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.isLoggedIn = true;
      state.stats = stats;
    },
    [signUp.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.errMsg || 'Something went wrong';
    },
    [signIn.pending]: (state, action) => {
      state.status = 'processing';
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { username, email, token, stats } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.isLoggedIn = true;
      state.stats.picker.correct += stats.picker.correct;
      state.stats.picker.total += stats.picker.total;
      state.stats.matcher.correct += stats.matcher.correct;
      state.stats.matcher.total += stats.matcher.total;
      state.stats.canvas.total += stats.canvas.total;
      if (stats.weakspot) {
        const keysList = [
          ...new Set([
            ...Object.keys(state.stats.weakspot),
            ...Object.keys(stats.weakspot),
          ]),
        ];
        keysList.forEach((key) => {
          if (state.stats.weakspot[key]) {
            state.stats.weakspot[key] += stats.weakspot[key] || 0;
          } else {
            state.stats.weakspot[key] = 1;
          }
        });
      }
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.errMsg || 'Something went wrong';
    },
    [exportStats.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action?.error || 'Something went wrong';
    },
    [autoSignIn.pending]: (state, action) => {
      state.status = 'processing';
    },
    [autoSignIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { username, email, token, stats } = action.payload;
      localStorage.setItem('token', token);
      state.username = username;
      state.email = email;
      state.isLoggedIn = true;
      state.stats = stats;
    },
    [autoSignIn.rejected]: (state, action) => {
      state.status = 'failed';
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
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectMatcherStats = (state) => state.user.stats.matcher;
export const selectPickerStats = (state) => state.user.stats.picker;
export const selectCanvasStats = (state) => state.user.stats.canvas;
export const selectUserStats = (state) => state.user.stats;
export const selectReqStatus = (state) => state.user.status;
export const selectReqError = (state) => state.user.error;

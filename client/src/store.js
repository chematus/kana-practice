import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'components/profile/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

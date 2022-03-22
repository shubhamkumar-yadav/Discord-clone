import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
import appReducer from '../features/appSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    app:appReducer,
  },
});

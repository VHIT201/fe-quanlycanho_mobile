
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Đường dẫn đến userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // Kết hợp user reducer vào store
  },
});

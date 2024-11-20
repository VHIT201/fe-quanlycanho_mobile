
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Đường dẫn đến userSlice
import buildingReducer from './buildingSlice'
import appReducer from './stateSlice'
import serviceReducer from './serviceSlice'
import problemReducer from './problemSlice'
import thunk from 'redux-thunk';
export const store = configureStore({
  reducer: {
    user: userReducer, // Kết hợp user reducer vào store
    building: buildingReducer,
    app: appReducer,
    service: serviceReducer,
    problems: problemReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import adminReducer from '../features/Admin/AdminSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    admin: adminReducer
  },
});

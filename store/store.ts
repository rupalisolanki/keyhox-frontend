import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import keysReducer from './slices/keysSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    keys: keysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiRegister, apiGetMe } from '../../api';

// Persist token helpers
const saveToken = (token: string) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try {
    return await apiLogin(email, password);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
  try {
    return await apiRegister(name, email, password);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    return await apiGetMe();
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      removeToken();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // register
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveToken(action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // getMe
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        removeToken();
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

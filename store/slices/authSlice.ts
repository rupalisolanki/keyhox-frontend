import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiRegister, apiGetMe, apiLogout, toast } from '../../api';

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
  try { return await apiLogin(email, password); }
  catch (e: any) { return rejectWithValue(e.message); }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
  try { return await apiRegister(name, email, password); }
  catch (e: any) { return rejectWithValue(e.message); }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try { return await apiGetMe(); }
  catch (e: any) { return rejectWithValue(e.message); }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try { await apiLogout(); } catch { /* clear client state regardless */ }
  removeToken();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveToken(action.payload.token);
        toast('Logged in successfully! Welcome back.', 'success');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast(action.payload as string || 'Login failed', 'error');
      });

    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveToken(action.payload.token);
        toast('Account created! You can now login with your credentials.', 'success');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast(action.payload as string || 'Registration failed', 'error');
      });

    builder
      .addCase(getMe.fulfilled, (state, action) => { state.user = action.payload.user; })
      .addCase(getMe.rejected, (state) => { state.user = null; state.token = null; removeToken(); });

    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        toast('Logged out successfully!', 'success');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

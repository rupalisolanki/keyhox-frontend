import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAddKeys, apiGetKeysByProduct, apiDeleteKey, apiGetInventory, toast } from '../../api';

interface KeysState {
  keys: any[];
  inventory: any[];
  counts: any;
  loading: boolean;
  error: string | null;
}

const initialState: KeysState = { keys: [], inventory: [], counts: null, loading: false, error: null };

export const addKeys = createAsyncThunk('keys/add', async ({ productId, keys }: { productId: string; keys: string[] }, { rejectWithValue }) => {
  try {
    return await apiAddKeys(productId, keys);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const fetchKeysByProduct = createAsyncThunk('keys/fetchByProduct', async ({ productId, status }: { productId: string; status?: string }, { rejectWithValue }) => {
  try {
    return await apiGetKeysByProduct(productId, status);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const deleteKey = createAsyncThunk('keys/delete', async (keyId: string, { rejectWithValue }) => {
  try {
    await apiDeleteKey(keyId);
    return keyId;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const fetchInventory = createAsyncThunk('keys/fetchInventory', async (_, { rejectWithValue }) => {
  try {
    return await apiGetInventory();
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    clearKeys(state) { state.keys = []; state.counts = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeysByProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchKeysByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = action.payload.keys;
        state.counts = action.payload.counts;
      })
      .addCase(fetchKeysByProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(addKeys.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addKeys.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Keys added successfully! (${action.payload.summary?.added ?? 0} added)`, 'success');
      })
      .addCase(addKeys.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; toast(action.payload as string || 'Failed to add keys', 'error'); })

      .addCase(deleteKey.fulfilled, (state, action) => {
        state.keys = state.keys.filter(k => k.id !== action.payload);
        if (state.counts) state.counts.available = Math.max(0, state.counts.available - 1);
        toast('Key deleted successfully!', 'success');
      })
      .addCase(deleteKey.rejected, (state, action) => { state.error = action.payload as string; toast(action.payload as string || 'Failed to delete key', 'error'); })

      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.inventory = action.payload.summary;
      });
  },
});

export const { clearKeys } = keysSlice.actions;
export default keysSlice.reducer;

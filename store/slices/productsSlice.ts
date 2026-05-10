import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetProducts,
  apiGetAdminProducts,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
} from '../../api';

interface ProductsState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = { items: [], loading: false, error: null };

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await apiGetProducts();
    return data.products;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const fetchAdminProducts = createAsyncThunk('products/fetchAdmin', async (_, { rejectWithValue }) => {
  try {
    const data = await apiGetAdminProducts();
    return data.products;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const createProduct = createAsyncThunk('products/create', async (productData: any, { rejectWithValue }) => {
  try {
    const data = await apiCreateProduct(productData);
    return data.product;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
  try {
    const res = await apiUpdateProduct(id, data);
    return res.product;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: string, { rejectWithValue }) => {
  try {
    await apiDeleteProduct(id);
    return id;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state: ProductsState) => { state.loading = true; state.error = null; };
    const rejected = (state: ProductsState, action: any) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchProducts.pending, pending)
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, rejected)

      .addCase(fetchAdminProducts.pending, pending)
      .addCase(fetchAdminProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchAdminProducts.rejected, rejected)

      .addCase(createProduct.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(createProduct.rejected, rejected)

      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateProduct.rejected, rejected)

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, rejected);
  },
});

export default productsSlice.reducer;

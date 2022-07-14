import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ProductsSliceState,
  Status,
  Product,
  SearchProductParams,
} from './types';

const initialState: ProductsSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>(
  'products/fetchProducts',
  async params => {
    const { api, categoryId, sortProperty, order, searchValue } = params;
    const response = await axios.get(
      `${api}${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&_sort=${sortProperty}&_order=${order}`
    );
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, state => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;

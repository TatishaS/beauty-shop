import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchProducts = createAsyncThunk(
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
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: state => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchProducts.rejected]: state => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;

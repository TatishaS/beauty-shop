import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSelectedSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.activeCategory = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setActiveCategory,
  setSelectedSort,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum OrderEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  order: OrderEnum;
};

interface FilterSliceState {
  searchValue: string;
  activeCategory: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  activeCategory: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
    order: OrderEnum.DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.activeCategory = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
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

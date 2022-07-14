import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { Item, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const extraItem = state.items.find(obj => obj.id === action.payload.id);
      if (extraItem) {
        extraItem.count++;
      } else {
        state.items = [
          ...state.items,
          {
            ...action.payload,
            count: 1,
          },
        ];
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(obj => obj.id === action.payload);
      if (item && item.count > 0) {
        item.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart: state => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

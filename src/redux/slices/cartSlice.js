import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    minusItem: (state, action) => {
      const item = state.items.find(obj => obj.id === action.payload);
      if (item && item.count > 0) {
        item.count--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearCart, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

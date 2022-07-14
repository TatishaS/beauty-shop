import { Item } from '../redux/cart/types';

export const calcTotalPrice = (items: Item[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};

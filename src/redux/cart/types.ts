export type Item = {
  id: number;
  imageUrl: string;
  size: number;
  title: string;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: Item[];
}

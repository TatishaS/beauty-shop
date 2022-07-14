export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  rating: number;
};

export type SearchProductParams = {
  api: string;
  categoryId: number;
  sortProperty: string;
  order: string;
  searchValue: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ProductsSliceState {
  items: Product[];
  status: Status;
}

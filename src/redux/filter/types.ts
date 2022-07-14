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

export interface FilterSliceState {
  searchValue: string;
  activeCategory: number;
  sort: Sort;
}

import React, { FC } from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (idx: number) => void;
};

const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    'Все',
    'Увлажнение',
    'Очищение',
    'Защита от солнца',
    'Бестселлеры',
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((cat, idx) => (
          <li
            className={idx === value ? 'active' : ''}
            key={idx}
            onClick={() => onClickCategory(idx)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

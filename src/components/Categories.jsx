import React from 'react';

const categories = [
  'Все',
  'Увлажнение',
  'Очищение',
  'Защита от солнца',
  'Бестселлеры',
];

const Categories = ({ value, onClickCategory }) => {
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

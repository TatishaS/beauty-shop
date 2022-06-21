import React from 'react';

const categories = [
  'Все',
  'Увлажнение',
  'Очищение',
  'Защита от солнца',
  'Бестселлеры',
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, idx) => (
          <li
            className={idx === activeCategory ? 'active' : ''}
            key={idx}
            onClick={() => setActiveCategory(idx)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

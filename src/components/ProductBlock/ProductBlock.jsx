import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const ProductBlock = ({ id, imageUrl, title, price, sizes }) => {
  const dispatch = useDispatch();
  const extraItem = useSelector(state =>
    state.cart.items.find(obj => obj.id === id)
  );

  const count = extraItem ? extraItem.count : 0;
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAddProduct = () => {
    const item = {
      id,
      imageUrl,
      title,
      price,
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="product-block__wrapper">
      <div className="product-block">
        <div className="product-block__content">
          <img className="product-block__image" src={imageUrl} alt="Product" />
          <h4 className="product-block__title">{title}</h4>
        </div>

        <div className="product-block__selector">
          <ul>
            {sizes.map((size, idx) => (
              <li
                className={activeSize === idx ? 'active' : ''}
                key={idx}
                onClick={() => setActiveSize(idx)}
              >
                {size} мл
              </li>
            ))}
          </ul>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">от {price} руб.</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAddProduct}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;

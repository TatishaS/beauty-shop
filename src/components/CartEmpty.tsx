import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/images/empty-cart.jpg';

const CartEmpty: FC = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятнее всего, вы не добавили продукты в корзину.
      <br />
      Чтобы выбрать нужные средства, вернитесь на главную страницу.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
);

export default CartEmpty;

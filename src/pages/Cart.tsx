import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';
import { ReactComponent as ClearCartIcon } from '../assets/images/icon-clear.svg';
import { clearCart } from '../redux/cart/slice';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';

const Cart: FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useAppSelector(state => state.cart);

  const totalCount =
    items &&
    items.reduce((sum: number, item: any) => {
      return sum + item.count;
    }, 0);

  const onClickClearCart = () => {
    if (window.confirm('Вы хотите удалить все товары?')) {
      dispatch(clearCart());
    }
  };

  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img />
            Корзина
          </h2>
          <button className="cart__clear" onClick={onClickClearCart}>
            <ClearCartIcon width="20" height="20" />
            <span>Очистить корзину</span>
          </button>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего продуктов: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} руб.</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <img />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

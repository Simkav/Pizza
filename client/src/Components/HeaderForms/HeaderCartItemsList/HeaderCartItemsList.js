import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderCartItem from '../HeaderCartItem/HeaderCartItem';
import cl from './HeaderCartItemsList.module.css';

export default memo(function HeaderCartItemsList ({ cart }) {
  const products = useSelector(({ products }) => products.products);

  const getTotalCartPrice = () => {
    const totalPrice = cart.reduce((acc, v) => {
      products.forEach((item) => {
        if (v.id === item.id) {
          acc = (Number(acc) + Number(item.price) * v.count).toFixed(2);
        }
      });
      return acc;
    }, []);
    return totalPrice;
  };

  return (
    <>
      <div className={cl.cart_list_container}>
        <ul className={cl.cart_items_container}>
          {cart.map((item) =>
            products.map((v) =>
              item.id === v.id ? (
                <HeaderCartItem key={v.name} cart={cart} item={item} v={v}/>
              ) : null,
            ),
          )}
        </ul>
      </div>
      <div className={cl.cart_total_cart_price_container}>
        Всего: {getTotalCartPrice()}
      </div>
      <div className={cl.cart_order_button_container}>
        <Link to={'/cart'} className={cl.cart_order_button}>
          Оформить заказ
        </Link>
      </div>
    </>
  );
});

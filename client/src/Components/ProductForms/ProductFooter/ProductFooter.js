import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import cl from './ProductFooter.module.css';
import {
  cartActionAdd,
  cartActionUpdate,
} from '../../../Actions/actionCreator';

export default function ProductFooter({ isHovered, setIsOrdered, item }) {
  const dispatch = useDispatch();
  const cart = useSelector(({ cart }) => cart.cartItems);

  const handleCount = (id) => {
    const isExist = cart.find((v) => v.id === id);
    if (cart && isExist) {
      const result = cart.map((v) => {
        if (v.id === id) {
          const currentCount = v.count;
          return { ...v, count: currentCount + 1 };
        } else {
          return v;
        }
      });
      dispatch(cartActionUpdate(result));
      window.localStorage.setItem('cart', JSON.stringify(result));
    } else {
      const newCartItem = { id: id, count: 1 };
      dispatch(cartActionAdd({ ...newCartItem }));
      window.localStorage.setItem(
        'cart',
        JSON.stringify([...cart, newCartItem]),
      );
    }
    setIsOrdered(true);
  };

  return (
    <div className={cl.product_footer}>
      <span className={cl.product_price}>Цена: {item.price}</span>
      <span className={cl.product_weight}>Вес: {item.weight}</span>
      {isHovered ? (
        <div className={cl.cart_order_button_container}>
          <div
            className={cl.cart_order_button}
            onClick={() => handleCount(item.id)}
          >
            <FaCartPlus className={cl.cart_plus_icon} />
            <span>Заказать</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

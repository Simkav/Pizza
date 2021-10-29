import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import cl from './ProductCartOrderButton.module.css';
import {
  cartActionAdd,
  cartActionUpdate,
} from '../../../Actions/actionCreator';

export default function ProductCartOrderButton ({ id }) {
  const dispatch = useDispatch();

  const cart = useSelector(({ cart }) => cart.cartItems);

  const handleCount = (id) => {
    if (cart && cart.find((v) => v.id === id)) {
      const result = JSON.parse(window.localStorage.getItem('cart')).map(
        (v) => {
          if (v.id === id) {
            const currentCount = v.count;
            return { ...v, count: currentCount + 1 };
          } else {
            return v;
          }
        },
      );
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
  };

  return (
    <div className={cl.cart_order_button_container}>
      <div className={cl.cart_order_button} onClick={() => handleCount(id)}>
        <FaCartPlus className={cl.cart_plus_icon} />
        <span>Заказать</span>
      </div>
    </div>
  );
}

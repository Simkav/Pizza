import { memo } from 'react';
import { useDispatch } from 'react-redux';
import cl from './HeaderCartItem.module.css';
import { cartActionUpdate } from '../../../Actions/actionCreator';
import CONSTANTS from '../../../constants';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default memo(function HeaderCartItem ({ cart, item, v }) {
  const dispatch = useDispatch();

  const handleCount = (action, id) => {
    const result = cart.reduce((acc, v) => {
      if (v.id === id && action === 'increment') {
        const currentCount = v.count + 1;
        acc.push({ ...v, count: currentCount });
      } else if (v.id === id && action === 'decrement') {
        const currentCount = v.count - 1;
        if (currentCount > 0) {
          acc.push({ ...v, count: currentCount });
        }
      } else {
        acc.push(v);
      }
      return acc;
    }, []);
    dispatch(cartActionUpdate(result));
    window.localStorage.setItem('cart', JSON.stringify(result));
  };

  return (
    <li className={cl.cart_product_container}>
      <div className={cl.product_image_link}>
        <img
          src={CONSTANTS.PUBLIC_PATH + v.image}
          alt={v.name}
          className={cl.product_image}
        />
      </div>
      <div className={cl.product_name_container}>
        <span className={cl.product_name}>{v.name}</span>
      </div>
      <div className={cl.product_count_container}>
        <FaMinus
          className={cl.product_count_button}
          onClick={() => handleCount('decrement', item.id)}
        />
        <span className={cl.product_count}>{item.count}</span>
        <FaPlus
          className={cl.product_count_button}
          onClick={() => handleCount('increment', item.id)}
        />
      </div>
    </li>
  );
});

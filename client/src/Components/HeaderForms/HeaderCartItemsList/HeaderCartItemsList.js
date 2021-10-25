import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActionUpdate } from '../../../Actions/actionCreator';
import CONSTANTS from '../../../constants';
import cl from './HeaderCartItemsList.module.css';

export default function HeaderCartItemsList ({ cart }) {
  const dispatch = useDispatch()
  const products = useSelector(({ products }) => products.products);

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
                <li key={v.name} className={cl.cart_product_container}>
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
}

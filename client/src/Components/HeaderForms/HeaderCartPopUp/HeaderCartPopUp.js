import cl from './HeaderCartPopUp.module.css';
import cn from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import { FaChevronDown, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import PopUpModule from '../../PopUpModule/PopUpModule';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from '../../../constants';
import { cartActionUpdate } from '../../../Actions/actionCreator';
import { Link } from 'react-router-dom';

export default function HeaderCartPopUp () {
  const dispatch = useDispatch();
  const [cartPopUp, setCartPopUp] = useState(false);
  const products = useSelector(({ products }) => products.products);
  const cart = useSelector(({ cart }) => cart.cartItems);

  useLayoutEffect(() => {
    if (!cart || cart.length === 0) {
      const newCart = JSON.parse(localStorage.getItem('cart'));
      if (newCart) dispatch(cartActionUpdate(newCart));
    }
  }, []);

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

  const getTotalCount = () => {
    const totalCount = cart.reduce((acc, v) => {
      acc = Number(acc) + Number(v.count);
      return acc;
    }, []);
    return totalCount;
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
    <div
      className={cl.col}
      onClick={() => setCartPopUp((cartPopUp) => !cartPopUp)}
    >
      <div className={cl.cart_container}>
        <FaShoppingCart />
        <>
          {cart && cart.length > 0 ? (
            <div className={cl.cart_items_count}>{getTotalCount()}</div>
          ) : null}
        </>
        <span className={cl.header_menu_text}>Корзина</span>
        <FaChevronDown
          className={cn(cl.arrow_down, {
            [cl.arrow_active]: cartPopUp,
          })}
        ></FaChevronDown>
      </div>
      <PopUpModule className={cl.cart} visible={cartPopUp}>
        {cart && cart.length > 0 ? (
          <>
            <ul className={cl.cart_items_container}>
              {cart.map((item) =>
                products.map((v) =>
                  item.id === v.id ? (
                    <li key={v.name} className={cl.cart_product_container}>
                      <img
                        src={CONSTANTS.PUBLIC_PATH + v.image}
                        alt={v.name}
                        className={cl.product_image}
                      />
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
            <div className={cl.cart_total_cart_price_container}>
              Всего: {getTotalCartPrice()}
            </div>
            <div className={cl.cart_order_button_container}>
              <Link to={'/cart'} className={cl.cart_order_button}>
                Оформить заказ
              </Link>
            </div>
          </>
        ) : (
          <div className={cl.cart_empty_container}>
            <span className={cl.cart_empty_text}>Корзина пустая</span>
          </div>
        )}
      </PopUpModule>
    </div>
  );
}

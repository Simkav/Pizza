import cl from './HeaderCartPopUp.module.css';
import cn from 'classnames';
import { memo, useLayoutEffect } from 'react';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import PopUpModule from '../../PopUpModule/PopUpModule';
import { useDispatch, useSelector } from 'react-redux';
import { cartActionUpdate } from '../../../Actions/actionCreator';
import HeaderCartItemsList from '../HeaderCartItemsList/HeaderCartItemsList';
import usePopUp from '../../../Hooks/usePopUp';

export default memo(function HeaderCartPopUp () {
  const dispatch = useDispatch();
  const [isHovered, cartPopUp, menuButtonRef] = usePopUp();
  const cart = useSelector(({ cart }) => cart.cartItems);

  useLayoutEffect(() => {
    if (!cart || cart.length === 0) {
      const newCart = JSON.parse(localStorage.getItem('cart'));
      if (newCart) dispatch(cartActionUpdate(newCart));
    }
  }, []);

  const getTotalCount = () => {
    const totalCount = cart.reduce((acc, v) => {
      acc = Number(acc) + Number(v.count);
      return acc;
    }, []);
    return totalCount;
  };

  return (
    <div ref={menuButtonRef} className={cl.col}>
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
            [cl.arrow_active]: cartPopUp || isHovered,
          })}
        ></FaChevronDown>
      </div>
      <PopUpModule visible={cartPopUp} hovered={isHovered}>
        {cart && cart.length > 0 ? (
          <HeaderCartItemsList cart={cart} />
        ) : (
          <div className={cl.cart_empty_container}>
            <span className={cl.cart_empty_text}>Корзина пустая</span>
          </div>
        )}
      </PopUpModule>
    </div>
  );
})

import React, { useEffect, useRef } from 'react';
import cl from './Aside.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AsideMenuList } from '../../Helpers/AsideMenuItemList';
import cn from 'classnames';
import { asideToggle } from '../../Actions/actionCreator';

export default function Aside () {
  const dispatch = useDispatch();
  const asideRef = useRef();
  const hamburgerMenuState = useSelector(
    ({ hamburgerMenu: { isOpened } }) => isOpened,
  );
  useEffect(() => {
    if (asideRef) {
      asideRef.current.focus()
    }
  }, [hamburgerMenuState]);

  return (
    <div
      ref={asideRef}
      tabIndex={0}
      className={cn(cl.aside_container, {
        [cl.aside_active]: hamburgerMenuState,
      })}
      onBlur={() => dispatch(asideToggle(false))}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className={cl.main_navigation_menu}>
        {AsideMenuList.map((item) => {
          return (
            <li key={item.name} className={cl.main_navigation_menu_item}>
              <Link to='/login' className={cl.main_navigation_menu_item_link}>
                <div className={cl.main_navigation_menu_item_icon}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={cl.main_navigation_menu_item_text_container}>
                  <span className={cl.main_navigation_menu_item_text}>
                    {item.name}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={cl.aside_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
}

import React from 'react';
import cl from './AdminPageHeader.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PopUpModule from '../PopUpModule/PopUpModule';
import useHovered from '../../Hooks/useHovered';

export default function AdminPageHeader () {
  const [menuPopUp, setMenuPopUp] = useState(false);
  const [isHovered, menuButtonRef] = useHovered();

  return (
    <div className={cl.auth_header}>
      <Link to={'/'} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src='/images/site-logo2.png'
          alt='Site Logo'
        ></img>
      </Link>
      <div className={cl.menu_button_container}>
        <div
          className={cl.menu_button}
          tabIndex={0}
          ref={menuButtonRef}
          onClick={() => setMenuPopUp((menuPopUp) => !menuPopUp)}
          onBlur={() => setMenuPopUp(false)}
        >
          Меню
          <PopUpModule visible={menuPopUp} hovered={isHovered}>
            <Link className={cl.menu_link} to={'/edit_products'}>
              Редактировать продукты
            </Link>
            <Link className={cl.menu_link} to={'/edit_ingridients'}>
              Редактировать ингридиенты
            </Link>
          </PopUpModule>
        </div>
      </div>
    </div>
  );
}

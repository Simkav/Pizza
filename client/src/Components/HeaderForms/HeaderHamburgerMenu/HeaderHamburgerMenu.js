import { FaBars, FaTimes } from 'react-icons/fa';
import cl from './HeaderHamburgerMenu.module.css';
import cn from 'classnames';
import { memo } from 'react';

export default memo(function HeaderHamburgerMenu ({
  hamburgerMenuState,
  setHamburgerMenuState,
}) {
  return (
    <div
      className={cn(cl.hamburger_menu_container, cl.hover_element, {
        [cl.hamburger_menu_active]: hamburgerMenuState,
      })}
      onClick={() =>
        setHamburgerMenuState((hamburgerMenuState) => !hamburgerMenuState)
      }
    >
      {!hamburgerMenuState ? (
        <FaBars className={cl.hamburger_bars} />
      ) : (
        <FaTimes className={cl.hamburger_cross} />
      )}
    </div>
  );
});

import cl from './Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import cn from 'classnames';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import { memo } from 'react';
import HeaderSiteLogo from '../HeaderSiteLogo/HeaderSiteLogo';

export default memo(function Header ({
  hamburgerMenuState,
  setHamburgerMenuState,
}) {
  return (
    <header className={cl.header}>
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
      <HeaderSiteLogo />
      <HeaderNavigation />
    </header>
  );
});

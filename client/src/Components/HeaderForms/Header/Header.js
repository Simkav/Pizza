import cl from './Header.module.css';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import { memo } from 'react';
import HeaderSiteLogo from '../HeaderSiteLogo/HeaderSiteLogo';
import HeaderHamburgerMenu from '../HeaderHamburgerMenu/HeaderHamburgerMenu';

export default memo(function Header ({
  hamburgerMenuState,
  setHamburgerMenuState,
}) {
  return (
    <header className={cl.header}>
      <HeaderHamburgerMenu
        hamburgerMenuState={hamburgerMenuState}
        setHamburgerMenuState={setHamburgerMenuState}
      />
      <HeaderSiteLogo />
      <HeaderNavigation />
    </header>
  );
});

import { memo, useEffect, useRef } from 'react';
import cl from './Aside.module.css';
import cn from 'classnames';
import AsideMenuList from '../AsideMenuList/AsideMenuList';

export default memo(function Aside ({
  hamburgerMenuState,
  setHamburgerMenuState,
}) {
  const asideRef = useRef();

  useEffect(() => {
    if (asideRef) {
      asideRef.current.focus();
    }
  }, [hamburgerMenuState]);

  return (
    <div
      ref={asideRef}
      tabIndex={-1}
      className={cn(cl.aside_container, {
        [cl.aside_active]: hamburgerMenuState,
      })}
      onBlur={() => setHamburgerMenuState(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <AsideMenuList />
      <div className={cl.aside_copyright_container}>
        <span>© «Mister Cat» является зарегистрированной торговой маркой</span>
      </div>
    </div>
  );
});

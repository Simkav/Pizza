import cl from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { asideToggle } from '../../../Actions/actionCreator';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';

export default function Header() {
  const dispatch = useDispatch();

  const hamburgerMenuState = useSelector(
    ({ hamburgerMenu: { isOpened } }) => isOpened,
  );

  const hamburgerMenuToggle = () => {
    const toggle = !hamburgerMenuState;
    dispatch(asideToggle(toggle));
  };

  return (
    <header className={cl.header}>
      <div
        className={cn(cl.hamburger_menu_container, cl.hover_element, {
          [cl.hamburger_menu_active]: hamburgerMenuState,
        })}
        onClick={() => hamburgerMenuToggle()}
      >
        {!hamburgerMenuState ? (
          <FaBars className={cl.hamburger_bars} />
        ) : (
          <FaTimes className={cl.hamburger_cross} />
        )}
      </div>
      <Link to={'/'} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src="/images/site-logo2.png"
          alt="Site logo"
          height="100%"
        />
      </Link>
      <HeaderNavigation />
    </header>
  );
}

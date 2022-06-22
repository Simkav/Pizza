import cl from './HeaderProfilePopUp.module.css';
import cn from 'classnames';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActionClear } from '../../../Actions/actionCreator';
import PopUpModule from '../../PopUpModule/PopUpModule';
import usePopUp from '../../../Hooks/usePopUp';

export default function HeaderProfilePopUp () {
  const dispatch = useDispatch();
  const [isHovered, profilePopUp, menuButtonRef] = usePopUp();

  const [isUserAuth, isAdmin] = useSelector(({ auth }) => [
    auth.user,
    auth.user ? auth.user.isAdmin : false,
  ]);

  const setLogOut = () => {
    dispatch(authActionClear());
  };

  return (
    <div ref={menuButtonRef} className={cl.col}>
      {isUserAuth ? (
        <>
          <div className={cl.button_container}>
            <FaUser />
            <span className={cl.header_menu_text}>Профиль</span>
            <FaChevronDown
              className={cn(cl.arrow_down, {
                [cl.arrow_active]: profilePopUp || isHovered,
              })}
            ></FaChevronDown>
          </div>
          <PopUpModule visible={profilePopUp} hovered={isHovered}>
            {isAdmin ? (
              <Link className={cl.profile_link} to={'/admin'}>
                Панель администратора
              </Link>
            ) : null}
            <Link className={cl.profile_link} to={'/profile'}>
              Персональная информация
            </Link>
            <div className={cl.profile_link} onClick={setLogOut}>
              Выйти
            </div>
          </PopUpModule>
        </>
      ) : (
        <Link className={cl.col} to={'/login'}>
          <div className={cl.button_container}>
            <FaUser />
            <span className={cl.header_menu_text}>Войти</span>
          </div>
        </Link>
      )}
    </div>
  );
}

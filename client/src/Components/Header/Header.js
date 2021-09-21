import { useState } from "react";
import cl from "./Header.module.css";
import PopUpModule from "../PopUpModule/PopUpModule";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaChevronDown,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../Actions/actionCreator";
import { Link } from "react-router-dom";
import { HeaderContactPhonesList } from "../../Helpers/HeaderContactPhonesList";
import cn from "classnames";

export default function Header() {
  const [contactsPopUp, setContactsPopUp] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);

  const isUserAuth = useSelector(({auth}) => auth).user

  const dispatch = useDispatch();
  const hamburgerMenuState = useSelector(({ hamburgerMenu }) => hamburgerMenu);
  const { asideToggle, authActionClear } = bindActionCreators(ActionCreators, dispatch);

  const hamburgerMenuToggle = () => {
    const toggle = !hamburgerMenuState.isOpened;
    asideToggle(toggle);
  };

  const setLogOut = () => {
    authActionClear()
  };

  return (
    <header className={cl.header}>
      <div
        className={cn(cl.hamburger_menu_container, cl.hover_element, {
          [cl.hamburger_menu_active]: hamburgerMenuState.isOpened,
        })}
        onClick={() => hamburgerMenuToggle()}
      >
        {!hamburgerMenuState.isOpened ? (
          <FaBars className={cl.hamburger_bars} />
        ) : (
          <FaTimes className={cl.hamburger_cross} />
        )}
      </div>
      <Link to={"/"} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src="/images/site-logo2.png"
          alt="Site logo"
          height="100%"
        />
      </Link>
      <div className={cl.header_navigation}>
        <div
          className={cl.col}
          onClick={() => setContactsPopUp((contactsPopUp) => !contactsPopUp)}
        >
          <div className={cl.contact_phone_container}>
            <FaPhone />
            <span className={cl.header_menu_text}>Контакты</span>
            <FaChevronDown
              className={cn(cl.arrow_down, {
                [cl.arrow_active]: contactsPopUp,
              })}
            ></FaChevronDown>
          </div>
          <PopUpModule visible={contactsPopUp} setVisible={setContactsPopUp}>
            {HeaderContactPhonesList.map((item) => {
              return (
                <div key={item.prefix} className={cl.contact_phone}>
                  <a href={item.href} className={cl.phone}>
                    <img
                      alt={item.alt}
                      src={item.imageSrc}
                      className={cl.phone_operator_icon}
                    />
                    {`(${item.prefix}) 228-3-228`}
                  </a>
                </div>
              );
            })}
          </PopUpModule>
        </div>
        {isUserAuth ? (
          <div
            className={cl.col}
            onClick={() => setProfilePopUp((profilePopUp) => !profilePopUp)}
          >
            <div className={cl.contact_phone_container}>
              <FaUser />
              <span className={cl.header_menu_text}>Профиль</span>
              <FaChevronDown
                className={cn(cl.arrow_down, {
                  [cl.arrow_active]: profilePopUp,
                })}
              ></FaChevronDown>
            </div>
            <PopUpModule visible={profilePopUp} setVisible={setProfilePopUp}>
              <Link className={cl.profile_link} to={"/profile"}>
                Персональная информация
              </Link>
              <div className={cl.profile_link} onClick={setLogOut}>
                Выйти
              </div>
            </PopUpModule>
          </div>
        ) : (
          <Link className={cl.col} to={"/login"}>
            <div className={cl.contact_phone_container}>
              <FaUser />
              <span className={cl.header_menu_text}>Войти</span>
            </div>
          </Link>
        )}
        <div className={cl.row}>
          <FaShoppingCart />
          <span className={cl.header_menu_text}>Cart</span>
        </div>
      </div>
    </header>
  );
}

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
import { Link } from "react-router-dom";
import { HeaderContactPhonesList } from "../../../Helpers/HeaderContactPhonesList";

export default function Header() {
  const [popUp, setPopUp] = useState(false);
  const arrowDownClasses = [cl.arrow_down];
  if (popUp) {
    arrowDownClasses.push(cl.arrow_active);
  }

  const dispatch = useDispatch();
  const hamburgerMenuState = useSelector((state) => state);

  const hamburgerMenuToggle = () => {
    const toggle = !hamburgerMenuState;
    dispatch({ type: "SWITCH_MENU", payload: toggle });
  };

  const hamburgerMenuClasses = [cl.hamburger_menu_container, cl.hover_element];

  if (hamburgerMenuState) {
    hamburgerMenuClasses.push(cl.hamburger_menu_active);
  }

  return (
    <header className={cl.header}>
      <div
        className={hamburgerMenuClasses.join(" ")}
        onClick={() => hamburgerMenuToggle()}
      >
        {!hamburgerMenuState ? (
          <FaBars className={cl.hamburger_bars} />
        ) : (
          <FaTimes className={cl.hamburger_cross} />
        )}
      </div>
      <div className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src="/images/site-logo2.png"
          alt="Site logo"
          height="100%"
        />
      </div>
      <div className={cl.header_navigation}>
        <div className={cl.col}>
          <div className={cl.contact_phone_container}>
            <FaPhone className="fas fa-phone" />
            <span className={cl.header_menu_text}>(044) 228-3-228</span>
            <FaChevronDown
              className={arrowDownClasses.join(" ")}
              onClick={() => setPopUp(true)}
            ></FaChevronDown>
          </div>
          <PopUpModule visible={popUp} setVisible={setPopUp}>
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
        <Link to={"/login"} className={cl.row}>
          <FaUser />
          <span className={cl.header_menu_text}>Войти</span>
        </Link>
        <div className={cl.row}>
          <FaShoppingCart />
          <span className={cl.header_menu_text}>Cart</span>
        </div>
      </div>
    </header>
  );
}

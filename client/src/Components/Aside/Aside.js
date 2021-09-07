import React from "react";
import cl from "./Aside.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AsideMenuList } from "../../Helpers/AsideMenuItemList";

export default function Aside() {
  const hamburgerMenuState = useSelector((state) => state);

  const asideClasses = [cl.aside_container];

  if (hamburgerMenuState) {
    asideClasses.push(cl.aside_active);
  }

  return (
    <aside className={asideClasses.join(" ")}>
      <ul className={cl.main_navigation_menu}>
        {AsideMenuList.map((item) => {
          return (
            <li key={item.name} className={cl.main_navigation_menu_item}>
              <Link to="/login" className={cl.main_navigation_menu_item_link}>
                <div className={cl.main_navigation_menu_item_icon}>
                  <img src={item.image} />
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
    </aside>
  );
}

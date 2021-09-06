import React from "react";
import cl from "./Aside.module.css";
import { useSelector } from "react-redux";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Aside() {
  const hamburgerMenuState = useSelector((state) => state);

  const asideClasses = [cl.aside_container];

  if (hamburgerMenuState) {
    asideClasses.push(cl.aside_active);
  }

  const menu_items_text = [
    "SALE",
    "Пицца",
    "Суши и роллы",
    "Супы",
    "Паста и лапша",
    "Гриль и закуски",
    "Салаты",
    "Десерты",
    "Напитки",
    "Бизнес-ланчи",
    "Сигареты",
  ];

  return (
    <aside className={asideClasses.join(" ")}>
      <ul className={cl.main_navigation_menu}>
        {menu_items_text.map((item) => {
          return (
            <li key={item} className={cl.main_navigation_menu_item}>
              <Link to="/login" className={cl.main_navigation_menu_item_link}>
                <FaQuestion
                  className={cl.main_navigation_menu_item_text}
                ></FaQuestion>
                {item}
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

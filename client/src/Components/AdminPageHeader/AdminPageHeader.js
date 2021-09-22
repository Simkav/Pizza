import React from "react";
import cl from "./AdminPageHeader.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import PopUpModule from "../PopUpModule/PopUpModule";

function AdminPageHeader() {
  const [menuPopUp, setMenuPopUp] = useState(false);

  return (
    <div className={cl.auth_header}>
      <Link to={"/"} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src="/images/site-logo2.png"
          alt="Site Logo"
        ></img>
      </Link>
      <div className={cl.menu_button_container}>
        <div
          className={cl.menu_button}
          onClick={() => setMenuPopUp((menuPopUp) => !menuPopUp)}
        >
          Меню
          <PopUpModule visible={menuPopUp} setVisible={setMenuPopUp}>
            <Link className={cl.menu_link} to={"/"}>
              Главная страница
            </Link>
            <Link className={cl.menu_link} to={"admin/edit_products"}>
              Редактировать продукты
            </Link>
          </PopUpModule>
        </div>
      </div>
    </div>
  );
}

export default AdminPageHeader;

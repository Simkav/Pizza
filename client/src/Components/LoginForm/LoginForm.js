import React from "react";
import { Link } from "react-router-dom";
import cl from "./../../Styles/Login.module.css";

function LoginForm() {
  return (
    <div className={cl.signup_form}>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"text"}
            placeholder={"Email адрес"}
            id={cl.email}
            className={cl.input}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"password"}
            placeholder={"Пароль"}
            id={cl.password}
            className={cl.input}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={`${cl.field_container_flex} ${cl.flex_start}`}>
          <input className={cl.checkbox} type={"checkbox"} />
          <span>Запомнить меня</span>
        </div>
        <div className={`${cl.field_container_flex} ${cl.flex_end}`}>
          <Link className={cl.forgot_password} to={"/login"}>
            Забыл пароль
          </Link>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <div className={cl.button}>Войти</div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

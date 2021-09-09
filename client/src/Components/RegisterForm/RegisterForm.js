import React from "react";
import cl from './../../Styles/Login.module.css'
import cn from 'classnames'

function RegisterForm() {
  return (
    <div className={cl.signup_form}>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"text"}
            placeholder={"Email адрес"}
            id={cl.email}
            className={cn(cl.input)}
          ></input>
        </div>
      </div>
      <div className={cn(cl.row, cl.no_bottom_margin)}>
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
        <div className={cl.field_container}>
          <input
            type={"password"}
            placeholder={"Подтвердите пароль"}
            id={cl.password}
            className={cl.input}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <div className={cl.button}>Зарегистрироваться</div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

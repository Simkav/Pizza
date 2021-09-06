import { useRef } from "react";
import Content from "../Components/Content/Content";
import cl from "./../Styles/Login.module.css";
import { Link } from "react-router-dom";

function Register() {
  const email = useRef(null);
  const pass = useRef(null);
  const passCheck = useRef(null);

  return (
    <Content header_aside_disabled={true}>
      <div className={cl.signup_header}>
        <Link to={"/"} className={cl.site_logo_container}>
          <img
            className={cl.site_logo}
            src="/images/site-logo2.png"
            alt="Site Logo"
          ></img>
        </Link>
        <div className={cl.login_button_container}>
          <Link to={"/login"} className={cl.login_button}>
            <span className={cl.login_button_text}>Войти</span>
          </Link>
        </div>
      </div>
      <div className={cl.signup_container}>
        <div className={cl.signup_info}>
          <h1>Создать аккаунт</h1>
        </div>
        <div className={cl.signup_form}>
          <div className={cl.row}>
            <div className={cl.field_container}>
              <input
                type={"text"}
                placeholder={"Email адрес"}
                id={cl.email}
                className={cl.input}
                ref={email}
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
                ref={pass}
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
                ref={passCheck}
              ></input>
            </div>
          </div>
          <div className={cl.row}>
            <div className={cl.field_container}>
              <div className={cl.button}>Зарегистрироваться</div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default Register;

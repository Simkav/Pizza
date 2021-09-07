import {useRef} from "react";
import Content from "../Components/Content/Content";
import cl from "./../Styles/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef(null);
  const pass = useRef(null);

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
          <Link to={"/register"} className={cl.login_button}>
            <span className={cl.login_button_text}>Зарегистрироваться</span>
          </Link>
        </div>
      </div>
      <div className={cl.signup_container}>
        <div className={cl.signup_info}>
          <h1>Войти в аккаунт</h1>
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
      </div>
    </Content>
  );
}

export default Login;
import React from "react";
import cl from "./AuthPageHeader.module.css";
import {Link} from 'react-router-dom'

function SignUpHeader(props) {
  return (
    <div className={cl.signup_header}>
      <Link to={"/"} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src="/images/site-logo2.png"
          alt="Site Logo"
        ></img>
      </Link>
      <div className={cl.login_button_container}>
        <Link to={props.login ? "/register" : "/login"} className={cl.login_button}>
          <span>{props.login ? "Зарегистрироваться" : "Войти"}</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUpHeader;

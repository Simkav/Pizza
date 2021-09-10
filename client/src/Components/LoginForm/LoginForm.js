import React from "react";
import { Link } from "react-router-dom";
import cl from "./../../Styles/Login.module.css";
import { useFormik } from "formik";

function LoginForm() {
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Submit values:", values);
    },
  });
  console.log('Visited fields:' , loginFormik.touched)
  return (
    <form className={cl.signup_form} onSubmit={loginFormik.handleSubmit}>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"text"}
            placeholder={"Email адрес"}
            className={cl.input}
            name={"email"}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"password"}
            placeholder={"Пароль"}
            className={cl.input}
            name={"password"}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
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
          <button type={"submit"} className={cl.button}>
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

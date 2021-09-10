import React from "react";
import cl from "./../../Styles/Login.module.css";
import cn from "classnames";
import { useFormik } from "formik";

function RegisterForm() {
  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      console.log("Submit values:", values);
    },
  });
  console.log('Visited fields:' , registerFormik.touched)
  return (
    <form className={cl.signup_form} onSubmit={registerFormik.handleSubmit}>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <input
            type={"text"}
            placeholder={"Email адрес"}
            className={cn(cl.input)}
            name={"email"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.email}
          ></input>
        </div>
      </div>
      <div className={cn(cl.row, cl.no_bottom_margin)}>
        <div className={cl.field_container}>
          <input
            type={"password"}
            placeholder={"Пароль"}
            className={cl.input}
            name={"password"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.password}
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
            name={"passwordConfirm"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.passwordConfirm}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <button type={"submit"} className={cl.button}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;

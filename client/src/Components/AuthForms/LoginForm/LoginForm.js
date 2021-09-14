import React from "react";
import { Link } from "react-router-dom";
import cl from "./LoginForm.module.css";
import cn from "classnames";
import { useFormik } from "formik";
import { signInSchema } from "../../../Validations/SignInSchema";

function LoginForm() {
  const loginFormik = useFormik({
    initialValues: {
      phone: "+38",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Submit values:", values);
    },
    validationSchema: signInSchema,
  });
  if (loginFormik.touched.phone) {
    if (!loginFormik.values.phone.includes('+38')) {
      loginFormik.values.phone = '+38'
    }
  }
  return (
    <form onSubmit={loginFormik.handleSubmit}>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !loginFormik.values.phone,
            },
            {
              [cl.field_container_valid]:
                !loginFormik.errors.phone & loginFormik.touched.phone,
            }
          )}
        >
          <label className={cl.label}>Номер телефона</label>
          <input
            type={"tel"}
            className={cn(
              cl.input,
              cl.phone,
              {
                [cl.input_invalid]:
                  loginFormik.touched.phone && loginFormik.errors.phone,
              },
              {
                [cl.input_valid]:
                  !loginFormik.errors.phone && loginFormik.touched.phone,
              }
            )}
            name={"phone"}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.phone}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {loginFormik.touched.phone ? loginFormik.errors.phone : ""}
        </span>
      </div>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !loginFormik.values.password,
            },
            {
              [cl.field_container_valid]:
                !loginFormik.errors.password & loginFormik.touched.password,
            }
          )}
        >
          <label className={cl.label}>Пароль</label>
          <input
            type={"password"}
            className={cn(
              cl.input,
              {
                [cl.input_invalid]:
                  loginFormik.touched.password && loginFormik.errors.password,
              },
              {
                [cl.input_valid]:
                  !loginFormik.errors.password && loginFormik.touched.password,
              }
            )}
            name={"password"}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
            autoComplete={"password"}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {loginFormik.touched.password ? loginFormik.errors.password : ""}
        </span>
      </div>
      <div className={cn(cl.row)}>
        <div className={cn(cl.field_container_flex, cl.flex_start)}>
          <input className={cl.checkbox} type={"checkbox"} />
          <span>Запомнить меня</span>
        </div>
        <div className={cn(cl.field_container_flex, cl.flex_end)}>
          <Link className={cl.forgot_password} to={"/login"}>
            Забыл пароль
          </Link>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <button
            type={"submit"}
            className={cn(cl.button, {
              [cl.button_active]:
                loginFormik.touched.phone &
                loginFormik.touched.password &
                loginFormik.isValid,
            })}
          >
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

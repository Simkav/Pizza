import React from "react";
import { Link } from "react-router-dom";
import cl from "./LoginForm.module.css";
import cn from "classnames";
import { useFormik } from "formik";
import { signInSchema } from "../../../Validations/SignInSchema";
import { AuthFormsInputItems } from "../../../Helpers/AuthFormsInputItems";
import { useDispatch } from "react-redux";
import { authActionLogin } from "../../../Actions/actionCreator";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const LoginFormik = useFormik({
    initialValues: {
      phone: "+38",
      password: "",
    },
    onSubmit: ({phone, password}) =>
      dispatch(
        authActionLogin(
          { phone, password },
          history
        )
      ),
    validationSchema: signInSchema,
  });

  const formikValue = LoginFormik.values;
  const formikTouched = LoginFormik.touched;
  const formikError = LoginFormik.errors;

  if (formikTouched.phone) {
    if (!formikValue.phone.includes("+38")) {
      formikValue.phone = "+38";
    }
  }

  return (
    <form onSubmit={LoginFormik.handleSubmit}>
      {AuthFormsInputItems.map((item, index) => {
        return index < 2 ? (
          <div key={item.name}>
            <div className={cl.row}>
              <div
                className={cn(
                  cl.field_container,
                  {
                    [cl.input_empty]: !formikValue[item.name],
                  },
                  {
                    [cl.field_container_valid]:
                      !formikError[item.name] & formikTouched[item.name],
                  }
                )}
              >
                <label className={cl.label}>{item.labelText}</label>
                <input
                  type={item.type}
                  className={cn(
                    cl.input,
                    {
                      [cl.input_invalid]:
                        formikTouched[item.name] && formikError[item.name],
                    },
                    {
                      [cl.input_valid]:
                        !formikError[item.name] && formikTouched[item.name],
                    }
                  )}
                  name={item.name}
                  onChange={LoginFormik.handleChange}
                  onBlur={LoginFormik.handleBlur}
                  value={formikValue[item.name]}
                  autoComplete={item.name}
                />
              </div>
            </div>
            <div className={cn(cl.row, cl.error_text)}>
              <span className={cl.input_error_text}>
                {formikTouched[item.name] ? formikError[item.name] : ""}
              </span>
            </div>
          </div>
        ) : null;
      })}
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
                formikTouched.phone &
                formikTouched.password &
                LoginFormik.isValid,
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

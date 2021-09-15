import { React } from "react";
import cl from "./RegisterForm.module.css";
import cn from "classnames";
import { useFormik } from "formik";
import { signUpSchema } from "../../../Validations/SignUpSchema";
import RegisterService from "../../../Services/AuthService";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const currentUserObject = (values) => {
    return {
      email: new Date(), //Временное решение!
      phone: values.phone,
      password: values.password,
    };
  };

  const registerFormik = useFormik({
    initialValues: {
      phone: "+38",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      console.log("Submit values:", values);
      RegisterService(currentUserObject(values)).then((data) => {
        if (data.status === 200) {
          history.push("/");
          dispatch({ type: "AUTHORIZED", payload: true });
          dispatch({ type: "LOGIN_USER", payload: currentUserObject(values) });
        }
      });
    },
    validationSchema: signUpSchema,
  });
  if (registerFormik.touched.phone) {
    if (!registerFormik.values.phone.includes("+38")) {
      registerFormik.values.phone = "+38";
    }
  }
  return (
    <form className={cl.signup_form} onSubmit={registerFormik.handleSubmit}>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !registerFormik.values.phone,
            },
            {
              [cl.field_container_valid]:
                !registerFormik.errors.phone & registerFormik.touched.phone,
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
                  registerFormik.touched.phone && registerFormik.errors.phone,
              },
              {
                [cl.input_valid]:
                  !registerFormik.errors.phone && registerFormik.touched.phone,
              }
            )}
            name={"phone"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.phone}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {registerFormik.touched.phone ? registerFormik.errors.phone : ""}
        </span>
      </div>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !registerFormik.values.password,
            },
            {
              [cl.field_container_valid]:
                !registerFormik.errors.password &
                registerFormik.touched.password,
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
                  registerFormik.touched.password &&
                  registerFormik.errors.password,
              },
              {
                [cl.input_valid]:
                  !registerFormik.errors.password &&
                  registerFormik.touched.password,
              }
            )}
            name={"password"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.password}
            autoComplete={"password"}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {registerFormik.touched.password
            ? registerFormik.errors.password
            : ""}
        </span>
      </div>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !registerFormik.values.passwordConfirm,
            },
            {
              [cl.field_container_valid]:
                !registerFormik.errors.passwordConfirm &
                registerFormik.touched.passwordConfirm,
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
                  registerFormik.touched.passwordConfirm &&
                  registerFormik.errors.passwordConfirm,
              },
              {
                [cl.input_valid]:
                  !registerFormik.errors.passwordConfirm &&
                  registerFormik.touched.passwordConfirm,
              }
            )}
            name={"passwordConfirm"}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.passwordConfirm}
            autoComplete={"password"}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {registerFormik.touched.passwordConfirm
            ? registerFormik.errors.passwordConfirm
            : ""}
        </span>
      </div>
      <div className={cl.row}>
        <div className={cl.field_container}>
          <button
            type={"submit"}
            className={cn(cl.button, {
              [cl.button_active]:
                registerFormik.touched.phone &
                registerFormik.touched.password &
                registerFormik.touched.passwordConfirm &
                registerFormik.isValid,
            })}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;

import { React } from "react";
import cl from "./RegisterForm.module.css";
import cn from "classnames";
import { useFormik } from "formik";
import { signUpSchema } from "../../../Validations/SignUpSchema";
import RegisterService from "../../../Services/AuthService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthFormsInputItems } from "../../../Helpers/AuthFormsInputItems";

function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUserObject = (values) => {
    return {
      email: new Date(), //Временное решение!
      phone: values.phone,
      password: values.password,
    };
  };

  const RegisterFormik = useFormik({
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

  const formikValue = RegisterFormik.values;
  const formikTouched = RegisterFormik.touched;
  const formikError = RegisterFormik.errors;

  if (formikTouched.phone) {
    if (!formikValue.phone.includes("+38")) {
      formikValue.phone = "+38";
    }
  }

  return (
    <form className={cl.signup_form} onSubmit={RegisterFormik.handleSubmit}>
      {AuthFormsInputItems.map((item) => {
        return (
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
                  onChange={RegisterFormik.handleChange}
                  onBlur={RegisterFormik.handleBlur}
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
        );
      })}
      <div className={cl.row}>
        <div className={cl.field_container}>
          <button
            type={"submit"}
            className={cn(cl.button, {
              [cl.button_active]:
                formikTouched.phone &
                formikTouched.password &
                formikTouched.passwordConfirm &
                RegisterFormik.isValid,
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

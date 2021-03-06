import cl from './RegisterForm.module.css';
import cn from 'classnames';
import { useFormik } from 'formik';
import { signUpSchema } from '../../../Validations/SignUpSchema';
import { useDispatch, useSelector } from 'react-redux';
import { AuthFormsInputItems } from '../../../Helpers/AuthFormsInputItems';
import { useHistory } from 'react-router-dom';
import ButtonLoadSpinner from '../ButtonLoadSpinner/ButtonLoadSpinner';
import ErrorModal from '../../ErrorModal/ErrorModal';
import * as ActionCreators from '../../../Actions/actionCreator';
import { bindActionCreators } from 'redux';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [isFetch, isError] = useSelector(({ auth }) => [
    auth.isFetching,
    auth.error,
  ]);

  const { authActionRegister, authActionClearError } = bindActionCreators(
    ActionCreators,
    dispatch,
  );

  const history = useHistory();

  const RegisterFormik = useFormik({
    initialValues: {
      phone: '+38',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: ({ phone, password }) =>
      authActionRegister({ phone, password }, history),
    validationSchema: signUpSchema,
  });

  const formikValue = RegisterFormik.values;
  const formikTouched = RegisterFormik.touched;
  const formikError = RegisterFormik.errors;

  if (!formikValue.phone.includes('+38')) {
    formikValue.phone = '+38';
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
                  },
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
                    },
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
                {formikTouched[item.name] ? formikError[item.name] : ''}
              </span>
            </div>
          </div>
        );
      })}
      <div className={cl.row}>
        <div className={cl.field_container}>
          <button type={'submit'} className={cn(cl.button, cl.button_active)}>
            {isFetch ? <ButtonLoadSpinner /> : '????????????????????????????????????'}
          </button>
        </div>
      </div>
      {isError ? (
        <ErrorModal error={isError} clearError={authActionClearError} />
      ) : null}
    </form>
  );
}

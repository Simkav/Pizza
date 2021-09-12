import cl from "./../Styles/Login.module.css";
import SignUpHeader from "../Components/AuthPageHeader/AuthPageHeader";
import LoginForm from "../Components/LoginForm/LoginForm";

function Login() {
  return (
    <>
      <SignUpHeader login={true} />
      <div className={cl.signup_container}>
        <div className={cl.signup_form_wrapper}>
          <div className={cl.signup_info}>
            <h1>Войти в аккаунт</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;

import cl from "./../Styles/Login.module.css";
import SignUpHeader from "../Components/AuthPageHeader/AuthPageHeader";
import RegisterForm from "../Components/RegisterForm/RegisterForm";

function Register() {
  return (
    <>
      <SignUpHeader />
      <div className={cl.signup_container}>
        <div className={cl.signup_form_wrapper}>
          <div className={cl.signup_info}>
            <h1>Создать аккаунт</h1>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Register;

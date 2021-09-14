import cl from "./AuthFormContainer.module.css";

function AuthFormContainer(props) {
  return (
    <div className={cl.signup_container}>
      <div className={cl.signup_form_wrapper}>
        <div className={cl.signup_info}>
          <h1>{props.login ? 'Войти в аккаунт' : 'Создать аккаунт'}</h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default AuthFormContainer;

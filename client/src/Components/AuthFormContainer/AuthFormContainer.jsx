import cl from "./AuthFormContainer.module.css";

function AuthFormContainer(props) {
  const isLogin = props.children._source.fileName.includes('Login');
  return (
    <div className={cl.signup_container}>
      <div className={cl.signup_form_wrapper}>
        <div className={cl.signup_info}>
          <h1>{isLogin ? 'Войти в аккаунт' : 'Создать аккаунт'}</h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default AuthFormContainer;

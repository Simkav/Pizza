import SignUpHeader from "../Components/AuthPageHeader/AuthPageHeader";
import LoginForm from "../Components/AuthForms/LoginForm/LoginForm";
import AuthFormContainer from "../Components/AuthFormContainer/AuthFormContainer";

function Login() {
  return (
    <>
      <SignUpHeader login={true} />
      <AuthFormContainer>
        <LoginForm />
      </AuthFormContainer>
    </>
  );
}

export default Login;

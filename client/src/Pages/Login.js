import LoginForm from "../Components/AuthForms/LoginForm/LoginForm";
import AuthFormContainer from "../Components/AuthForms/AuthFormContainer/AuthFormContainer";
import AuthPageHeader from "../Components/AuthForms/AuthPageHeader/AuthPageHeader";

export default function Login() {
  return (
    <>
      <AuthPageHeader login={true} />
      <AuthFormContainer children={<LoginForm />} />
    </>
  );
}

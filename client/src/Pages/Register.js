import SignUpHeader from "../Components/AuthPageHeader/AuthPageHeader";
import RegisterForm from "../Components/AuthForms/RegisterForm/RegisterForm";
import AuthFormContainer from "../Components/AuthFormContainer/AuthFormContainer";

function Register() {
  return (
    <>
      <SignUpHeader />
      <AuthFormContainer children={<RegisterForm />} />
    </>
  );
}

export default Register;

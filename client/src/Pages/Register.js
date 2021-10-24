import AuthFormContainer from '../Components/AuthForms/AuthFormContainer/AuthFormContainer';
import AuthPageHeader from '../Components/AuthForms/AuthPageHeader/AuthPageHeader';
import RegisterForm from '../Components/AuthForms/RegisterForm/RegisterForm';

export default function Register() {
  return (
    <>
      <AuthPageHeader />
      <AuthFormContainer children={<RegisterForm />} />
    </>
  );
}

import SignUpHeader from "../Components/AuthPageHeader/AuthPageHeader";
import ProfileForm from "../Components/ProfileForm/ProfileForm";
import ProfileFormContainer from "../Components/ProfileFormContainer/ProfileFormContainer";

function Register() {
  return (
    <>
      <SignUpHeader />
      <ProfileFormContainer children={<ProfileForm />} />
    </>
  );
}

export default Register;

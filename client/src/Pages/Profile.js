import ProfileForm from "../Components/ProfileForm/ProfileForm";
import ProfileFormContainer from "../Components/ProfileFormContainer/ProfileFormContainer";

function Profile() {
  return (
    <>
      <ProfileFormContainer children={<ProfileForm />} />
    </>
  );
}

export default Profile;

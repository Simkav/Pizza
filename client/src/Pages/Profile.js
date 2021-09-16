import Content from "../Components/Content/Content";
import ProfileForm from "../Components/ProfileForm/ProfileForm";
import ProfileFormContainer from "../Components/ProfileFormContainer/ProfileFormContainer";

function Profile() {
  return (
    <>
      <Content children={<ProfileFormContainer children={<ProfileForm />} />} />
    </>
  );
}

export default Profile;

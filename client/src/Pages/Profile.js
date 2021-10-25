import ProfileForm from '../Components/ProfileForms/ProfileForm/ProfileForm';
import ProfileFormContainer from '../Components/ProfileForms/ProfileFormContainer/ProfileFormContainer';

export default function Profile() {
  return (
    <>
      <ProfileFormContainer children={<ProfileForm />} />
    </>
  );
}

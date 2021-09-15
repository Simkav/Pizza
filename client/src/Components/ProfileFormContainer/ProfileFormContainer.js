import cl from './ProfileFormContainer.module.css'

function ProfileFormContainer(props) {
  return (
    <div className={cl.profile_container}>
      <div className={cl.profile_form_wrapper}>
        <div className={cl.profile_info}>
          <h1>Профиль</h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default ProfileFormContainer;

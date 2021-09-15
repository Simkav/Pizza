import { useSelector } from "react-redux";
import cl from "./ProfileForm.module.css";

function ProfileForm() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  console.log(currentUser);
  return (
    <>
      <div className={cl.row}>
        <span>{currentUser.phone}</span>
      </div>
      <div className={cl.row}>
        <span>{currentUser.password}</span>
      </div>
    </>
  );
}

export default ProfileForm;

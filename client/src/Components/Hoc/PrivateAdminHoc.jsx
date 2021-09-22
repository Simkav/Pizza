import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateAdminHoc = ({ Component }) => {
  // Temporary
  const isAdmin = useSelector(({ auth }) => auth).user;
  return isAdmin ? <Component /> : <Redirect to={"/"} />;
};

export default PrivateAdminHoc;

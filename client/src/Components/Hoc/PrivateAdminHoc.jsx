import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateAdminHoc = ({ Component }) => {
  const [isAdmin] = useSelector(({auth}) => [auth.user, auth.user ? auth.user.isAdmin : false]);
  return isAdmin ? <Component /> : <Redirect to={"/"} />;
};

export default PrivateAdminHoc;

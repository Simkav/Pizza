import { Redirect } from "react-router-dom";

const OnlyNotAuthorizedUserHoc = (Component) => (props) => {
  const isAuth = localStorage.getItem("AccessToken");

  return !isAuth ? <Component /> : <Redirect to={"/"} />;
};

export default OnlyNotAuthorizedUserHoc;

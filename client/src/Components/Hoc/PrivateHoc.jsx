import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import WithHeaderFooterAside from "./WithHeaderFooterAside/WithHeaderFooterAside";

const PrivateHoc = (Component) => {
  const isAuth = useSelector(({ auth }) => auth).user;
  return (props) => {
    const MainComponent = WithHeaderFooterAside(Component);
    return isAuth ? <MainComponent /> : <Redirect to={"/"} />;
  };
};

export default PrivateHoc;

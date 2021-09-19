import { Redirect } from "react-router-dom";
import WithHeaderFooterAside from "../Hoc/WithHeaderFooterAside";

const PrivateHoc = (Component) => (props) => {
  const isAuth = false;
  const MainComponent = WithHeaderFooterAside(Component)
  return isAuth ? (
    <MainComponent />
  ) : (
    <Redirect to={"/"} />
  );
};

export default PrivateHoc;

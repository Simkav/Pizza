import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Content from "./Components/Content/Content";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import WithHeaderFooterAside from "./Components/Hoc/WithHeaderFooterAside";
import PrivateHoc from "./Components/PrivateHoc/PrivateHoc";
import OnlyNotAuthorizedUserHoc from "./Components/OnlyNotAuthorizedUserHoc.jsx/OnlyNotAuthorizedUserHoc";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WithHeaderFooterAside(Content)} />
        <Route exact path="/login" component={OnlyNotAuthorizedUserHoc(Login)} />
        <Route exact path="/register" component={OnlyNotAuthorizedUserHoc(Register)} />
        <Route exact path="/profile" component={PrivateHoc(Profile)} />
        <Redirect to={"/"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

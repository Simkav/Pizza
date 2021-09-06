import Header from "./Components/Header/Header/Header";
import Aside from "./Components/Aside/Aside";
import Content from "./Components/Content/Content";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  //TODO make different pages, load different components!!!
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Redirect to={"/"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import Header from "./Components/Header/Header/Header";
import Aside from "./Components/Aside/Aside";
import Content from "./Components/Content/Content";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  //TODO make different pages, load different components!!!
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Aside />
          <Content />
        </Route>
        <Route exact path="/login">
          <Content header_state={true}/>
        </Route>
        <Route exact path="/register">
          <Content header_state={true}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

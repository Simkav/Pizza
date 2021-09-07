import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Content from './Components/Content/Content'
import Login from './Pages/Login'
import Register from './Pages/Register'
import WithHeaderFooterAside from './Components/Hoc/WithHeaderFooterAside'
function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={WithHeaderFooterAside(Content)} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

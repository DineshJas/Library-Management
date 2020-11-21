import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

import './styles/App.css';
// import History from "./utils/History";
import Home from "./components/Home";
import Header from './components/Header';
import Users from './components/Users';

const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Header/>
      <Component {...props}/>
    </div>
  )}/>
)

class App extends Component {
  render() { 
    return ( 
        <BrowserRouter>
          <Switch>
            <NavRoute exact path='/' component={Home} />
            <NavRoute exact path='/books' component={Home} />
            <NavRoute exact path='/users' component={Users} />
          </Switch>
        </BrowserRouter>
     );
  }
}
 
export default App;

import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import NavbarComp from './components/NavbarComp';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import StopPage from './pages/StopPage';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <div>
        <NavbarComp />

        <Switch>
          <Route exact path="/" component={Home} />
          {/* <PublicRoute exact path="/:stopID"  component={Stop} /> use wikicountires as example!! */}
          
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/stops/:id" component={StopPage} />
          <PrivateRoute exact path="/private" component={Private} />
        </Switch>
      </div>
    );
  }
}

export default App;

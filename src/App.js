import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';




class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import stopsReducer from "./redux/reducers/stopsReducer"

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './lib/Auth';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(stopsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>

  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>

  </Provider>
  , document.getElementById('root'));

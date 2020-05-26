import React from 'react';

import authService from "./auth-service";
import userService from "./user-service";
const {Consumer, Provider} = React.createContext();


// CHECK THE PORTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// authService
//       .signup({ firstName, lastName, email, password })
//       .then(user => this.setState({ isLoggedin: true, user }))
//       .catch(err => console.log(err) );



// HOC
function withAuth(WrappedComponent) {

  return function (props) {
    return (
      <Consumer>
        {(valueFromProvider) => (
          <WrappedComponent
            {...props}
            user={valueFromProvider.user}
            isLoggedIn={valueFromProvider.isLoggedIn}
            isLoading={valueFromProvider.isLoading}
            //errorMessage={valueFromProvider.errorMessage}
            login={valueFromProvider.login}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
            deleteUser={valueFromProvider.deleteUser}
          />
        )}
      </Consumer>
    )
  }
}

class AuthProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    //errorMessage: null
  }

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' and check if user is authenitcated
    // axios.get('http://localhost:5666/auth/me', { withCredentials: true })
    authService.me()
      .then((user) => { // maybe we want to get favStops at the same time and save them to the state (and update in StopPage)
        this.setState({isLoggedIn: true, isLoading: false, user});
      })
      .catch((err) => this.setState({isLoggedIn: false, isLoading: false, user: null}));
  }

  login = (username, password) => {
    authService.login({username, password})
      // axios.post('http://localhost:5666/auth/login', { username, password }, { withCredentials: true })
      .then((user) => {
        this.setState({isLoggedIn: true, isLoading: false, user});//, errorMessage: null
      })
      .catch((err) => {
        console.log(err)
        this.setState({isLoggedIn: false, isLoading: false, user: null});//, errorMessage: "Login failed"
      }); // we only consolelog this error but to change the RENDERING, we should 
    // somehow^TM handle it
    // cretae error object and check in views if it exists ?
  }
  signup = (username, password) => {
    // axios.post('http://localhost:5666/auth/signup', { username, password }, { withCredentials: true })
    authService.signup({username, password})
      .then((user) => {
        // const user = response.data; dont need this with authServices
        this.setState({isLoggedIn: true, isLoading: false, user});
      })
      .catch((err) => {
        console.log(err)
        this.setState({isLoggedIn: false, isLoading: false, user: null})//, errorMessage: "Signup failed"
      });
  }
  logout = () => {
    // axios.get('http://localhost:5666/auth/logout', { withCredentials: true })
    authService.logout()
      .then(() => {
        this.setState({isLoggedIn: false, isLoading: false, user: null});
        // can we set other stuff here as well? to fix that after login/logout teh faves show wrong?
      })
      .catch((err) => console.log(err));
  }

  deleteUser = () => {
    userService.delete()
    .then(() => {
      this.setState({isLoggedIn: false, isLoading: false, user: null})
    })
    .catch((err) => { console.log(err)} )
  }

  render() {
    const {user, isLoggedIn, isLoading} = this.state;//, errorMessage
    const {login, signup, logout, deleteUser} = this;

    return (
      <Provider value={{user, isLoggedIn, isLoading, login, signup, logout, deleteUser}}>
        {this.props.children}
      </Provider>//, errorMessage this was after isLoading
    )
  }
}

export {withAuth, AuthProvider}
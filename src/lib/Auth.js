import React from 'react';
import axios from 'axios';

const { Consumer, Provider } = React.createContext();



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
            login={valueFromProvider.login}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
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
    isLoading: true
  }

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' and check if user is authenitcated
    axios.get('http://localhost:5000/auth/me', { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => this.setState({ isLoggedIn: false, isLoading: false, user: null }));
  }

  login = (username, password) => {
    axios.post('http://localhost:5000/auth/login', { username, password }, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => console.log(err));
  }
  signup = (username, password) => {
    axios.post('http://localhost:5000/auth/signup', { username, password }, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => console.log(err));
  }
  logout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then((response) => {
        this.setState({ isLoggedIn: false, isLoading: false, user: null });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { user, isLoggedIn, isLoading } = this.state;
    const { login, signup, logout } = this;

    return (
      <Provider value={{ user, isLoggedIn, isLoading, login, signup, logout }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { withAuth, AuthProvider }
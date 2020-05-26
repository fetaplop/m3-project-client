import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/Auth'

class Navbar extends Component {
  
  shouldComponentUpdate(nextProps) {
    return (this.props.user !== nextProps.user)
  }

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider 
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;


    return (
      <nav className="navbar">
        <Link to={'/'} id='home-btn'>
          <h4>Search for stops</h4>
        </Link>
        {
          isLoggedIn
            ? <div>
              <p>{user.username}</p>
              <button onClick={logout}> Logout </button>
              <br />
                <Link to="/private">
                  {' '}
                  <button className="navbar-button">My Page</button>{' '}
                </Link>
            </div>
            : (
              <>
                <Link to="/login">
                  {' '}
                  <button className="navbar-button">Login</button>{' '}
                </Link>
                <br />
                <Link to="/signup">
                  {' '}
                  <button className="navbar-button">Sign Up</button>{' '}
                </Link>

              </>
            )}
      </nav>
    );
  }
}

export default withAuth(Navbar);

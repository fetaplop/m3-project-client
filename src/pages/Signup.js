import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../lib/Auth';

class Signup extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.signup(username, password);
    // this.props.signup method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        {/* {this.props.errorMessage? <h1> {this.props.errorMessage} </h1> : null } */}

        <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);

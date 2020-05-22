import React, { Component } from "react";
import { withAuth } from './../lib/Auth';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
    // this.props.login method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOk = event => {
    this.setState({ errorMessage: null })
  }

  render() {
    const { username, password } = this.state;

    // if (this.props.errorMessage) {
    //   return (
    //   <div>
    //     <h1> {this.props.errorMessage} </h1>
    //     <button onClick={this.handleOk} > OK I GUESS </button>

    //   </div>)
    // }
      
      return (

        

        <div>
          <h1>Login</h1>

          {this.props.errorMessage? <h1> {this.props.errorMessage} </h1> : null }
  
          <form onSubmit={this.handleFormSubmit}>
  
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
  
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
  
            <input type="submit" value="Login" />
          </form>
        </div>
      );
  }
}

export default withAuth(Login);

import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../App.css';

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

  // handleOk = event => {
  //   this.setState({ errorMessage: null })
  // }

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

        

        <div class="userForm">
          <h1>Login</h1>

          {/* {this.props.errorMessage? <h1> {this.props.errorMessage} </h1> : null } */}

          {/* this IS GUARANTEED TO WORK IF BOOTSTRAP FAILS: */}
          {/* <form onSubmit={this.handleFormSubmit}>
  
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
  
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
  
            <input type="submit" value="Login" />
          </form> */}

          <Form onSubmit={this.handleFormSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" name="username" value={username} onChange={this.handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2} style={{textAlign: "center"}} >
              Password:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" name="password" value={password} onChange={this.handleChange}/>
            </Col>
          </Form.Group>
          <Button type="submit" value="Login">   Login     </Button>

          </Form>

        </div>
      );
  }
}

export default withAuth(Login);



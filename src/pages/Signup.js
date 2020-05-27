import React, { Component } from "react"; // why do we sometimes deconstruct?
import { Link } from "react-router-dom";
import { withAuth } from './../lib/Auth';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../App.css';

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
      <div class="userForm">
        <h1>Sign Up</h1>

        {/* {this.props.errorMessage? <h1> {this.props.errorMessage} </h1> : null } */}


        {/* GUARANTEED TO WORK IF BOOTSRAP FAILS! */}
        {/* <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Signup" />
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
          <Button type="submit" value="Signup">   Signup    </Button>

          </Form>
        <div id="link-login">
        <p>Already have an account?</p>
        <Link to={"/login"}> <Button> Login </Button> </Link>
        </div>
        
      </div>
    );
  }
}

export default withAuth(Signup);

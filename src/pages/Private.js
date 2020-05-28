import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import userService from "../lib/user-service"
import {Link, Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';

//import DeleteUser from "../components/DeleteUser";
import '../App.css';


class Private extends Component {

  state = {
    userFaves: null,
    // not great. How can I destroy the user state as well? 
    // we have to get rid of ALL user data AND session. then we need to REDIRECT TO LOGIN
  }

  componentWillUnmount() {
    // could I use this?????
  }

  componentDidMount() {
    userService.favourites()
    .then(arrayFromServer => {
      console.log('got this array of bus stops from server:', arrayFromServer)
      this.setState({userFaves: arrayFromServer})
    })
  }

  // deleteMe = () => {
  //   return userService.delete()
  //   .then( deleted => {
  //       console.log('deleted user, hopefully');
  //       console.log('this.props after delete', this.props)
  //       this.props.history.push("/")
        
  //   })
  // }

  render() {
    return (
      <div id="private">
        
        {
          this.props.isLoggedIn
            ? <div class="greeting"> <h1 >Welcome, {this.props.user.username}!</h1>
             { (this.state.userFaves !== null) && (this.state.userFaves.length !== 0) ? <h4>Here are your saved bus stops:</h4> : <h4> You haven't saved any bus stops yet! </h4> }
             </div>
            : null
        }
        
        {/* {
          <>
          (this.state.userFaves.length !== 0)
          ? <p> Your saved bus stops: </p>
          : <p>You haven't saved any stops yet</p>
          <>
        } */}
        
        {
          this.state.userFaves !== null 
          ? (
            this.state.userFaves.map(stop => {
              return ( // consider another key for this?
              <div class="search-field" key={stop.stop_code}>
                <Link to={`/stops/${stop._id}`}> <h4>{stop.stop_name}, code: {stop.stop_code}</h4>  </Link> 
              </div> )
            })
            
            )
          : null
        }

        {
          this.props.isLoggedIn
          ? <Button variant="danger" onClick={this.props.deleteUser} > Delete user? </Button>// <DeleteUser/>
          : null
        }
        
      </div>
    );
  }
}

export default withAuth(Private);

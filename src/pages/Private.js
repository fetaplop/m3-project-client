import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import userService from "../lib/user-service"
import {Link, Redirect} from "react-router-dom";
import DeleteUser from "../components/DeleteUser";


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
      <div>
        <h1>Private Route, display my favourite stops here</h1>
        {
          this.props.isLoggedIn
            ? <h3>Username: {this.props.user.username}</h3>
            : null
        }

        {
          this.state.userFaves !== null 
          ? (
            this.state.userFaves.map(stop => {
              return ( 
              <div key={stop.stopCode}> 
                <Link to={`/stops/${stop._id}`}> {stop.name}, code {stop.stopCode} </Link> 
              </div> )
            })
            
            )
          : null
        }

        {
          this.props.isLoggedIn
          ?  <button onClick={this.props.deleteUser}> Delete user?</button> // <DeleteUser/>
          : null
        }
        
      </div>
    );
  }
}

export default withAuth(Private);

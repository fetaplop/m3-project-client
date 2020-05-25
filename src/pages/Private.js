import React, { Component } from "react";
import { withAuth } from './../lib/Auth';

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Private Route, display my favourite stops here</h1>
        {
          this.props.isLoggedIn
            ? <h3>Username: {this.props.user.username}</h3>
            : null
        }

      </div>
    );
  }
}

export default withAuth(Private);

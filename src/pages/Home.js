import React from 'react'
import Search from '../components/Search'
import {withAuth} from '../lib/Auth';
import '../App.css';

function Home(props) {
  return (
    <div class="greeting"> 
      {props.isLoggedIn
      ? <h1>Welcome, {props.user.username}! </h1>
      : <h1>Welcome, traveller! </h1> }
      
        <Search/>
    </div>
  )
}

export default withAuth(Home);
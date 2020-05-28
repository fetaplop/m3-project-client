import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import '../App.css';

import { withAuth } from './../lib/Auth';

class NavbarComp extends Component {
  
  shouldComponentUpdate(nextProps) {
    return (this.props.user !== nextProps.user)
  }

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider 
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;


  //   return (
  //     <nav className="navbar">
  //       <Link to={'/'} id='home-btn'>
  //         <h4>Search for stops</h4>
  //       </Link>
  //       {
  //         isLoggedIn
  //           ? <div>
  //             <p>{user.username}</p>
  //             <button onClick={logout}> Logout </button>
  //             <br />
  //               <Link to="/private">
  //                 {' '}
  //                 <button className="navbar-button">My Page</button>{' '}
  //               </Link>
  //           </div>
  //           : (
  //             <>
  //               <Link to="/login">
  //                 {' '}
  //                 <button className="navbar-button">Login</button>{' '}
  //               </Link>
  //               <br />
  //               <Link to="/signup">
  //                 {' '}
  //                 <button className="navbar-button">Sign Up</button>{' '}
  //               </Link>

  //             </>
  //           )}
  //     </nav>
  //   );
  // }

  // refactor render:

  return (
    <Navbar bg="dark" variant="dark">
    <Nav className="nav" activeKey="/" variant="pills" >
      <Nav.Item> 
        <NavLink to="/" activeClassName="active"> 
        <Button size="lg" variant="outline-info"> Search for stops </Button>
        </NavLink>
      </Nav.Item>
    
      
      {/* <NavLink to="blabla" activeClassName="active" exact>home</NavLink> */}  

      {isLoggedIn
      ? (
      <>
        <Nav.Item>
        <Link to="/private" ><Button size="lg" variant="outline-info"> My page </Button></Link>
        </Nav.Item>
      

      
      <Nav.Item>
       <Button onClick={this.props.logout} size="lg" variant="outline-info"> Logout </Button>
      </Nav.Item>
      </>
      
        /* <Nav.Item>
          <Nav.Link eventKey="/logout" onClick={logout}> Logout </Nav.Link>
        </Nav.Item> */
      )
      : 
      <>
      <Nav.Item>
        <Link to="/signup"><Button size="lg" variant="outline-info"> Signup </Button></Link>
      </Nav.Item>

      <Nav.Item>
         <Link to="/login"><Button size="lg" variant="outline-info"> Login </Button></Link>
      </Nav.Item>
      </>
      }
    </Nav>
    </Navbar>
  );
  }

}

/* <Nav
  activeKey="/home"
  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  >
  <Nav.Item>
  <Nav.Link href="/home">Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
  <Nav.Item>
  <Nav.Link eventKey="link-2">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
  <Nav.Link eventKey="disabled" disabled>
  Disabled
    </Nav.Link>
    </Nav.Item>
  </Nav> */

  export default withAuth(NavbarComp);
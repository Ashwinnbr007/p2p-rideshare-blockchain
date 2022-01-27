import React, { Component } from 'react';
import { Navbar,Container,NavDropdown,Nav } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar className='navbar-light bg-primary fixed-top flex-md-nowrap p-0 shadow'>
            <a className="navbar-brand text-white col-sm-3 col-md-2 mr-0" href="#">Ryde</a>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link className = "text-white" href="#home">About</Nav.Link>
                <Nav.Link className = "text-white" href="#link">Available Rides</Nav.Link>
            </Navbar.Collapse>
            <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <a className="text-white"><span id="account">Welcome  {this.props.account}</span></a>
            </li>
            </ul>
        </Navbar>   
      </>
    );
  }
}

export default NavBar;

import React, { Component } from 'react';
import { Navbar,Container,NavDropdown,Nav } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
          <a class="navbar-brand text-white col-md-1 mr-0" href="#">Ryde</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home<span class="sr-only"></span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Book Ryde</a>
              </li>
            </ul>
          </div>
        </nav> 
      </>
    );
  }
}

export default NavBar;

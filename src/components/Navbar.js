import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top flex-md-nowrap shadow p-0 pt-2 pb-2">
          <a className="navbar-brand text-white col-md-1 mr-0" href="#">Ryde</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Book Ryde</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Home<span className="sr-only"></span></a>
              </li>
            </ul>
            <button className='btn btn-outline-danger'>
              logout
            </button>
          </div>
        </nav> 
      </>
    );
  }
}

export default NavBar;

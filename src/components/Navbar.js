import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-primary fixed-top flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand text-white col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blockchain Ride
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <a className="text-white"><span id="account">{this.props.account}</span></a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

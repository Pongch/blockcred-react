import React, { Component } from 'react';
import './App.css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ListIcon from 'mdi-react/FormatListBulletedIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';
import ContactMailIcon from 'mdi-react/ContactMailIcon';
import AccountCheckIcon from 'mdi-react/AccountCheckIcon';
import DatabasePlusIcon from 'mdi-react/DatabasePlusIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import {Icon, Navbar, NavItem, SideNav, SideNavItem, Button} from 'react-materialize';

class Navigation extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <SideNav
          trigger={
            <div className="navbar-fixed">
              <nav className="amber darken-1 z-depth-2">
                <div className="container">
                  <div className="nav-wrapper">
                    <a href="/blockcred" className="brand-logo">BlockCred</a>
                    <ul id="nav-mobile" className="right ">
                      <li><ListIcon className="mdi-icon-white"/></li>
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
          }
          options={{ closeOnClick: true }}
          >
          <SideNavItem userView
            user={{
              background: 'https://gateway.ipfs.io/ipfs/QmNwAaxhTQ4LQeM2xmjFS29fU2hKY4qsXqUoEkAhUbKjMF',
              image: 'https://gateway.ipfs.io/ipfs/QmaqGPJjnL55xd867fmgieFPzqZBdEvpdnmXpFHJzB8uYo',
              name: 'Welcome to BlockCred',
              email: 'Version 0.1.5'
            }}
          />
          <SideNavItem href='/'><MagnifyIcon />Verify Certificate</SideNavItem>
          <SideNavItem divider />
          <SideNavItem href='/register-cert'><DatabasePlusIcon/>Register Certificate</SideNavItem>
          <SideNavItem divider />
          <SideNavItem href='/verify-org'><AccountCheckIcon/>Verify Organization</SideNavItem>
          <SideNavItem href='/register-org'><ContactMailIcon/>Register Organization</SideNavItem>
          <SideNavItem divider />
        </SideNav>
      </div>
    )
  }
}


export default Navigation;

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
              <nav className="grey lighten-5 z-depth-2">
                <div className="container">
                  <div className="nav-wrapper">
                    <a href="/blockcred" className="brand-logo"><img className="made-logo" src="https://ismade.org/wp-content/uploads/2017/09/made-250x50.png" /></a>
                    <ul id="nav-mobile" className="right ">
                      <li><ListIcon className="mdi-icon-grey"/></li>
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
              background: 'https://ismade.org/wp-content/uploads/2016/11/Bangkok1-1-compressor.jpg',
              image: 'https://instagram.fbkk4-2.fna.fbcdn.net/vp/b63ef53eda6a41faa930f1850eb5f9aa/5B757F2E/t51.2885-19/s150x150/22710452_1869940249984406_9165433482082516992_n.jpg',
              name: 'KX Made',
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

import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ListIcon from 'mdi-react/FormatListBulletedIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';


if (typeof window.web3 !== 'undefined') {
  var web3 = new Web3(window.web3.currentProvider);
  console.log("using web3 provider like Metamask")
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}


var Organization =
web3.eth.contract(
  [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"OrganizationAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"email","type":"string"}],"name":"setOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getOrganization","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
)

let org = Organization.at("0x516e8e58a460d3f1384bc32ff2326f2333e77772");


var BlockCert =
web3.eth.contract(
  [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getCertificate","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"},{"name":"organization","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"}],"name":"setCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getCertificateById","outputs":[{"name":"idRet","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"},{"name":"organization","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"i","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
)


let block = BlockCert.at('0xA7d5D5f6E9b7b0952eF1FaEF81ba46D637Ba9194');


class RegisterOrg extends Component {


  constructor(props){
    super(props);

    this.state = {
      orgName: " ",
      orgEmail:" "
    }

    this.setOrgName = this.setOrgName.bind(this);
    this.setOrgEmail = this.setOrgEmail.bind(this);
    this.registerOrg = this.registerOrg.bind(this);
  }

  componentWillMount(){

  }


  setOrgName(event){
    let content = event.target.value
    this.setState({orgName:content});
  }

  setOrgEmail(event){
    let content = event.target.value
    this.setState({orgEmail:content});
  }

  registerOrg(){
    let orgName = this.state.orgName;
    let orgEmail = this.state.orgEmail;

    org.setOrganization(orgName, orgEmail,{from: web3.eth.accounts[0]},(error, res) => {
      if(!error){
        console.log(res);
        }
    });
  }

  render() {


    return (
      <div>
          <div className="navbar-fixed">
            <nav className="amber darken-1 z-depth-5">
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
        <div className="container top-padding">
          <div className="card-panel z-depth-4">
            <h5>Register Your Organization</h5>
             <div className="input-field col s12">
               <input defaultValue="" id="person-name" type="text" className="validate"onChange={this.setOrgName}/>
               <label className="active" htmlFor="person-name">Organization Name</label>
             </div>
             <div className="input-field col s12">
               <input defaultValue="" id="degree-name" type="text" className="validate" onChange={this.setOrgEmail}/>
               <label className="active" htmlFor="degree-name">Organization Email</label>
               <input type="button" className="light-blue darken-1 btn" name="register" onClick={this.registerOrg} id="degree-click" value="REGISTER"/>
             </div>
            </div>
          </div>
        </div>
    );
  }
}

export default RegisterOrg;

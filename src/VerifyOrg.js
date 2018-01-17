import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ListIcon from 'mdi-react/FormatListBulletedIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';
import Navigation from './Navigation';

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/CT0ypkZhkZ8gm2pLeyD0"));
}

var Organization =
web3.eth.contract(
  [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"OrganizationAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"email","type":"string"}],"name":"setOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getOrganization","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
)

let org = Organization.at("0x516e8e58a460d3f1384bc32ff2326f2333e77772");

console.log(org);

var BlockCert =
web3.eth.contract(
  [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getCertificate","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"},{"name":"organization","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"}],"name":"setCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getCertificateById","outputs":[{"name":"idRet","type":"uint256"},{"name":"name","type":"string"},{"name":"certDate","type":"string"},{"name":"certName","type":"string"},{"name":"organization","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"i","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
)


let block = BlockCert.at('0xA7d5D5f6E9b7b0952eF1FaEF81ba46D637Ba9194');


class VerifyOrg extends Component {


  constructor(props){
    super(props);

    this.state = {
      orgID: "0x6a36580fa59f1b8f4865444ab9fe9168b625981c",
      orgName: "...",
      orgEmail: "..."
    }

    this.setOrgID = this.setOrgID.bind(this);
    this.getOrg = this.getOrg.bind(this);
  }

  componentWillMount(){

  }

  setOrgID(event){
    let content = event.target.value
    this.setState({orgID:content});
  }

  getOrg(){
    let queryID = this.state.orgID;
    console.log(queryID);
    org.getOrganization(queryID, (error, res) => {
      if(!error){
        this.setState({
          orgName: res[0],
          orgEmail: res[1]
        })
        console.log(res);
      } else {
        console.log("error");
      }
    })
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="container top-padding">
          <div className="card-panel z-depth-4">
            <h3>Organization Check</h3>
            <div className="row">
               <div className="input-field col s6">
                 <input defaultValue="0x6a36580fa59f1b8f4865444ab9fe9168b625981c" id="org-id" type="text" className="validate" onChange={this.setOrgID}/>
                 <label className="active" htmlFor="first_name2">Organization's address</label>
                 <input type="button" className="light-blue darken-1 btn" name="Find" id="org-click" defaultValue="Find" onClick={this.getOrg}/>
               </div>
              </div>
          </div>
          <div className="card-panel z-depth-4">
            <p>Organization Name:</p> {this.state.orgName}
            <p>Organization Email:</p> {this.state.orgEmail}
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyOrg;

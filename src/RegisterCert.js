import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ListIcon from 'mdi-react/FormatListBulletedIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';
import Navigation from './Navigation';


if (typeof window.web3 !== 'undefined') {
  var web3 = new Web3(window.web3.currentProvider);
  console.log("using web3 provider like Metamask")
} else {
  // set the provider you want from Web3.providers
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


class RegisterCert extends Component {


  constructor(props){
    super(props);

    this.state = {
      certID: " ",
      person:" ",
      certName:" ",
      date:" ",
    }

    this.setCertID = this.setCertID.bind(this);
    this.setPerson = this.setPerson.bind(this);
    this.setCertName = this.setCertName.bind(this);
    this.setCertDate = this.setCertDate.bind(this);
    this.registerCert = this.registerCert.bind(this);
  }

  componentWillMount(){

  }

  setCertID(event){
    let content = event.target.value
    this.setState({certID:content});
  }

  setPerson(event){
    let content = event.target.value
    this.setState({person:content});
  }

  setCertName(event){
    let content = event.target.value
    this.setState({certName:content});
  }

  setCertDate(event){
    let content = event.target.value
    this.setState({date:content});
  }

  registerCert(){
    let certName = this.state.certName;
    let certID = parseInt(this.state.certID);
    let person = this.state.person;
    let certDate = this.state.date;

    block.setCertificate(certID, person, certDate, certName, {from: web3.eth.accounts[0]},(error, res) => {
      if(!error){
        console.log(res);
        }
    });
  }

  render() {


    return (
      <div>
        <Navigation />
        <div className="container top-padding">
          <div className="card-panel z-depth-4">
               <h5>Register Your Certificate</h5>
               <div className="input-field col s12">
                 <input defaultValue="" id="person-name" type="text" className="validate"onChange={this.setPerson}/>
                 <label className="active" htmlFor="person-name">Persons Name</label>
               </div>
               <div className="input-field col s12">
                 <input defaultValue="" id="degree-name" type="text" className="validate" onChange={this.setCertName}/>
                 <label className="active" htmlFor="degree-name">Degree Name</label>
               </div>
               <div className="input-field col s12">
                 <input defaultValue="" id="degree-id" type="text" className="validate" onChange={this.setCertID}/>
                 <label className="active" htmlFor="degree-id">Degree Unique ID NO.</label>
               </div>
               <div className="input-field col s12">
                 <input defaultValue="" id="degree-date" type="text" className="validate" onChange={this.setCertDate}/>
                 <label className="active" htmlFor="degree-date">Degree Issuance Date</label>
                 <input type="button" className="light-blue darken-1 btn" name="register" onClick={this.registerCert} id="degree-click" value="REGISTER"/>
               </div>
            </div>
          </div>
        </div>
    );
  }
}

export default RegisterCert;

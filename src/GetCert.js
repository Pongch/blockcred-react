import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ListIcon from 'mdi-react/FormatListBulletedIcon';
import SchoolIcon from 'mdi-react/SchoolIcon';

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


class GetCert extends Component {


  constructor(props){
    super(props);

    this.state = {
      certID: "173820172",
      person:"...",
      certName:"...",
      date:"...",
      org:"...",
      orgAttest:"..."
    }

    this.getCert = this.getCert.bind(this);
    this.setID = this.setID.bind(this);
    this.getOrg = this.getOrg.bind(this);
  }

  componentWillMount(){

  }

  setID(event){
    let content = event.target.value
    this.setState({certID:content});
  }

  getCert(){
    let queryID = this.state.certID;
    console.log(queryID)
    block.getCertificateById(queryID, (error, res) => {
      if(!error){
        this.setState({
          person: res[1],
          certName: res[3],
          date: res[2],
          org: res[4]
        })
      } else {
        console.log("error");
      }
    })
  }

  getOrg(){
    let orgAddress = this.state.org;
    org.getOrganization(orgAddress, (error, res)=>{
      if(!error){
        this.setState({
          orgAttest: res[0]
        })
      }
    })
  }

  render() {


    return (
      <div>
          <div className="navbar-fixed">
            <nav className="teal lighten-3 z-depth-5">
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
        <div className="container">
          <h3>Retrieve Proof of Credential</h3>
           <div className="row">
             <div className="input-field col s6">
               <input type="text" className="validate" id="cert-id" name="id" defaultValue={this.state.certID} onChange={this.setID}/>
               <label htmlFor="cert" className="active">Certificate ID</label>
               <button className="waves-effect waves-light btn" id="cert-click" onClick={this.getCert}>Get Certificate</button>
             </div>
           </div>
           <h4 className="center-align"><SchoolIcon/></h4>
           <p className="center-align">To all persons be it known that</p>
           <h4 className="center-align">{this.state.person}</h4>
           <p className="center-align">has completed the prescribed studies and satisfied the requirement for:</p>
           <h4 className="center-align">{this.state.certName}</h4>
           <p className="center-align">at the date:</p>
           <h4 className="center-align">{this.state.date}</h4>
           <p className="center-align">certified by:</p>
           <p className="center-align">{this.state.org}</p>
           <div className="card-action" id="proof-auth-btn">
           </div>
           <div id="authenticate-field">{this.state.orgAttest}</div>
           <button className="waves-effect waves-light btn" id="authenticate-click" onClick={this.getOrg}>Check Proof of Authenticity</button>
          </div>
      </div>
    );
  }
}

export default GetCert;

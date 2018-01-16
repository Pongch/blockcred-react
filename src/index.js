import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GetCert from './GetCert';
import RegisterCert from './RegisterCert';
import RegisterOrg from './RegisterOrg';
import VerifyOrg from './VerifyOrg';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={GetCert} />
      <Route path="/register-cert" component={RegisterCert} />
      <Route path="/register-org" component={RegisterOrg} />
      <Route path="/verify-org" component={VerifyOrg} />
    </div>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();

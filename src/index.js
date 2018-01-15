import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GetCert from './GetCert';
import RegisterCert from './RegisterCert';
import RegisterOrg from './RegisterOrg';
import VerifyOrg from './VerifyOrg';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RegisterOrg />, document.getElementById('root'));
registerServiceWorker();

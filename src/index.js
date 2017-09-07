import React from 'react';
import ReactDOM from 'react-dom';
import { Router,hashHistory} from 'react-router';
import Routes from './routes';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes history={hashHistory} routes={Routes} />,
  document.getElementById('root'));
registerServiceWorker();
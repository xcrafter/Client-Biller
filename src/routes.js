import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Print from './print'
import Excel from './Ext'
import Items from './Items'
import Clear from './Clear'

const Routes = (props) => (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
     <Route path="/ext" component={Excel} />
    <Route path="/print" component={Print}/>
    <Route path="/items" component={Items}/>
    <Route path="/clear-all-list" component={Clear}/>
  </Router>
);

export default Routes;
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/details/:siteKey" exact component={DetailPage} />
        </Switch>
      </Router>
      
    );
  }
  
};


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Tickets from './containers/Tickets/Tickets';

import Navigation from './components/UI/Navigation/Navigation';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation userType="user" />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/tickets">
          <Tickets />
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

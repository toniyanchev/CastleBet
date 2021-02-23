import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './containers/Home/Home';
import Tickets from './containers/Tickets/Tickets';
import SlotMachine from './containers/SlotMachine/SlotMachine';
import Login from './containers/Login/Login';

import Navigation from './components/UI/Navigation/Navigation';

import './App.css';
import Register from './components/Auth/Register/Register';
import ProfileContainer from './containers/Profile/Profile';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer />

      <Navigation userType="user" />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/tickets">
          <Tickets />
        </Route>

        <Route path="/slot">
          <SlotMachine />
        </Route>

        <Route path="/profile">
          <ProfileContainer />
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

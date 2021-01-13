
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Login from './components/layouts/Auth/Login/Login';
import Register from './components/layouts/Auth/Register/Register';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Layout>
    );
  }
}

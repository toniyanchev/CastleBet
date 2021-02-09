import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { UserContextProvider } from './contexts/User/UserContextProvider';
import App from './App';

const app = (
  <UserContextProvider>
    <App />
  </UserContextProvider>
)

ReactDOM.render(app, document.getElementById('root'));

import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./containers/Home/Home";
import Tickets from "./containers/Tickets/Tickets";
import SlotMachine from "./containers/SlotMachine/SlotMachine";
import Login from "./containers/Login/Login";

import Navigation from "./components/UI/Navigation/Navigation";

import "./App.css";
import Register from "./components/Auth/Register/Register";
import ProfileContainer from "./containers/Profile/Profile";
import { UserContext } from "./contexts/User/UserContext";
import Deposit from "./components/Deposit/Deposit";

const App = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("castleBetUser");

    if (token) {
      userContext.setToken(token);
      userContext.setUser(JSON.parse(user));
    }
  }, [userContext.setToken, userContext.setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />

        <Navigation userType="user" />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {userContext.token ? null : (
            <Route exact path="/login">
              <Login />
            </Route>
          )}

          {userContext.token ? null : (
            <Route exact path="/register">
              <Register />
            </Route>
          )}

          {userContext.token ? (
            <Route exact path="/tickets">
              <Tickets />
            </Route>
          ) : null}

          {userContext.token ? (
            <Route exact path="/slot">
              <SlotMachine />
            </Route>
          ) : null}

          {userContext.token ? (
            <Route exact path="/profile">
              <ProfileContainer />
            </Route>
          ) : null}

          {userContext.token ? (
            <Route exact path="/deposit">
              <Deposit />
            </Route>
          ) : null}

          <Route path="/">
            <div>ERROR 404</div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

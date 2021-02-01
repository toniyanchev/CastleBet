import React, { useState } from 'react';

import postFetch from '../../../postFetch';

import Logo from '../../UI/Logo/Logo';

import {hidePassIcon, showPassIcon} from '../images';

import './Login.css';

const AUTHENTICATE_USER = `http://localhost:4000/users/authenticate`;

const Login = props => {
    const { handleRegisterNow } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = () => {
        let user = {
            username: username,
            password: password
        }
        console.log(user);
        postFetch(AUTHENTICATE_USER, user);
    }

    return (
        <div className="LoginWrapper">
            <div className="LoginHeader">
                <Logo
                    pxWidth={100}
                    pxHeight={100}
                    clickHandler={() => null}
                />
            </div>
            <div className="LoginFields">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="LoginPasswordField">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <img
                        className="ShowHidePassIcon"
                        src={showPassword ? showPassIcon : hidePassIcon}
                        alt="showPasswordImgErr"
                        onClick={() => setShowPassword(!showPassword)} />
                </div>
            </div>
            <div className="LoginButtons">
                <button 
                    className="LoginButton"
                    onClick={() => login()} >LOGIN</button>
                <div className="LoginFooter">
                    <div>Not registered yet?</div>
                    <div
                        className="RegisterNow"
                        onClick={() => handleRegisterNow()} >Register now!</div>
                </div>
            </div>
        </div>
    );
}

export default Login;

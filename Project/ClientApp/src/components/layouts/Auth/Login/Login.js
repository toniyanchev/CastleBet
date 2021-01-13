import React, { useState } from 'react';

import {hidePassIcon, showPassIcon} from '../images';

import './Login.css';

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="LoginWrapper">
            <div className="LoginHeader">
                CastleBet
            </div>
            <div className="LoginFields">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <div className="PasswordField">
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
                    onClick={() => {

                    }} >LOGIN</button>
                <div className="LoginFooter">
                    <div>Not registered yet?</div>
                    <div
                        className="RegisterNow"
                        onClick={() => {
                            
                        }} >Register now!</div>
                </div>
            </div>
        </div>
    );
}

export default Login;

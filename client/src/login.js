import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [containerClass, setClass] = useState('container');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const emailValidation = () => {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email)
    }


    const createAccount = async (e) => {
        e.preventDefault()
        console.log(email, password)
        if (emailValidation()) {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email, password
                })
            })
            const result = await res.json()
            if (res.status === 200) {
                setClass('container')
            }
        } else {
            window.alert('Please enter valid email')
        }
    }

    const login = async (e) => {
        e.preventDefault()
        console.log(emailValidation())
        if (emailValidation()) {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email, password
                })
            })
            const result = await res.json();
            if (res.status === 200) {
                console.log(result)
                navigate('/');
            }
        } else {
            window.alert("Please enter valid email")
        }
    }


    return (
        <div className={containerClass} >
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form">
                        <h2 className="title">Login</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" className="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" className="inputfield" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <input type="submit" value="Login" className="btn solid joinbtn" onClick={(e) => { login(e) }} />
                    </form>
                    <form className="sign-up-form">
                        <h2 className="title">Create Account</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" className="username" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="password" placeholder="Passwrord" className="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        {/* <button onClick={(e) => { createAccount(e) }}>register</button> */}
                        <button type="button" onClick={(e) => { createAccount(e) }} className="createbtn btn" >Create Account</button>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            If You does not have account. So, you can create your account.
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={(e) => { setClass('container sign-up-mode') }}>
                            Create Account
                        </button>
                    </div>

                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            If you have your account. So, login your account form here.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={(e) => { setClass('container') }}>
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
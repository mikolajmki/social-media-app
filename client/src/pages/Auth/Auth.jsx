import React from "react";
import './Auth.css';
import Logo from '../../img/logo.png';
import { useState } from 'react';
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from "../../actions/authAction.js";

const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const [isSignUp, setIsSignup] = useState(true);
    const [data, setData] = useState({ firstname: '', lastname: '', password: '', confirmpass: '', username: '' });
    console.log(loading);
    const [confirmPass, setConfirmPass] = useState(true);

    const formDataHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
        console.log(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    }

    const resetForm = () => {
        setConfirmPass(true);
        setData({ firstname: '', lastname: '', password: '', confirmpass: '', username: '' });
    }

    return (
        <div className="auth">
            {/* Left Side  */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="webname">
                    <h1>MK Media</h1>
                    <h6>Have fun exploring the world.</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                <form className="info__form authform" onSubmit={ handleSubmit }>
                    <h3>{ isSignUp ? 'Sign up' : 'Login'}</h3>
                    { isSignUp  && (<div>
                        <input type="text" placeholder="First name" className="info__input" name="firstname" onChange={ formDataHandler } value={data.firstname}/>
                        <input type="text" placeholder="Last name" className="info__input" name="lastname" onChange={ formDataHandler } value={data.lastname} />
                    </div>)}
                    <div>
                        <input type="text" placeholder="Username" className="info__input" name="username" onChange={ formDataHandler } value={data.username} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="info__input" name="password" onChange={ formDataHandler } value={data.password}/>
                        { isSignUp && (<input type="password" placeholder="Confirm password" className="info__input" name="confirmpass" onChange={ formDataHandler } value={data.confirmpass} />) }
                    </div>
                    <span style={{ display: confirmPass ? 'none' : 'block', color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px'}}>
                        Passwords doesn't match.
                    </span>
                    <div>
                        <span onClick={ () => { setIsSignup((prev) => !prev); resetForm(); } } style={{fontSize: '12px', fontStyle: 'oblique', cursor: 'pointer'}}>{ isSignUp ? "Already have an account? Log in." : "Don't have an account? Sign up."}</span>
                    </div>
                <button type="submit" className="button info__button" disabled={loading} >{ loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Login' }</button>
                </form>
            </div>
        </div>
    )

    function SignUp() {
        return (
            <div className="a-right">
                <form className="info__form authform">
                    <h3>Sign up</h3>
                    <div>
                        <input type="text" placeholder="First name" className="info__input" name="firstname" />
                        <input type="text" placeholder="Last name" className="info__input" name="lastname" />
                    </div>
                    <div>
                        <input type="text" placeholder="Username" className="info__input" name="username" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="info__input" name="password" />
                        <input type="password" placeholder="Confirm password" className="info__input" name="confirmpass" />
                    </div>
                    <div>
                        {isSignUp && (
                            <span style={{fontSize: '12px'}}>You are already registered. Log in.</span>
                        )}
                    </div>
                    <button type="submit" className="button info__button" >Login</button>
                </form>
            </div>
        )
    }
}

export default Auth;
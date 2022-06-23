import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BtnLoader from "../../widget/Base/BtnLoader";


function Login(props) {
    const [display, setDisplay] = useState(false);



    return (
        <div className="auth" >

            <div className="auth-image">
                <img src={'/assets/svg/login.svg'} />
            </div>

            <div className="auth-main">
                <div className="auth-main-inner">
                    <img className="auth-main-inner-logo" src={'/assets/logo/logo.jpg'} alt="logo" />
                    <p className="auth-main-inner-title">Welcome back to your account.</p>
                    <form onSubmit={Login}>

                        <div className="auth-main-inner-form-item">
                            <div className="auth-main-inner-form-item-icon">
                                <img src="/assets/svg/mail.svg" />
                            </div>
                            <input type="emial" placeholder="Email Address" />
                        </div>

                        <div className="auth-main-inner-form-item">
                            <div className="auth-main-inner-form-item-icon">
                                <img src="/assets/svg/lock.svg" />
                            </div>
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="auth-main-inner-form-bottom">
                            {display ?
                                <button type="button" className="auth-main-inner-form-bottom-btn " disabled><BtnLoader /></button>
                                :
                                <button type="submit" className="auth-main-inner-form-bottom-btn ">Login</button>
                            }
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
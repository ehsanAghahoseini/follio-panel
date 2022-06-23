import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BtnLoader from "../../widget/Base/BtnLoader";
import { toast } from "react-toastify";
import { Login_Api } from "../../widget/api/auth-api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (e: any) => {
        e.preventDefault()
        setDisplay(true)
        const req = await Login_Api(e)
        setDisplay(false)
        if (req.user && req.token) {
            localStorage.setItem('token', req.token)
            localStorage.setItem('username', req.user.username)
            localStorage.setItem('name', req.user.name)
            localStorage.setItem('userId', req.user.id)
            localStorage.setItem('userDetail', JSON.stringify(req.user))
            navigate('/panel');
            toast('Success login', { type: "success" })
        }
        else if (req.message) {
            // for (let i of req[`validation-errors`]) {
            toast(req.message, { type: "error" })
            // }
        }
    }

    return (
        <div className="auth" >

            <div className="auth-image">
                <img src={'/assets/svg/login.svg'} />
            </div>

            <div className="auth-main">
                <div className="auth-main-inner">
                    <img className="auth-main-inner-logo" src={'/assets/logo/logo.jpg'} alt="logo" />
                    <p className="auth-main-inner-title">Welcome back to your account.</p>
                    <form onSubmit={onFinish}>

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
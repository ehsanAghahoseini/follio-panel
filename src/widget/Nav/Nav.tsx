import React, { useState, useEffect } from "react";
// import Logo from '../../static/img/logo2.png'
import NavData from '../Nav/NavData';
import { Link } from 'react-router-dom';


function Nav(props: any) {
    const [activeItem, setActiveItem] = useState(0);

    const Logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }


    useEffect(() => {
        const nav = document.getElementById('nav-bg');
        window.addEventListener('click', function (e) {
            //@ts-ignore
            if (nav != null && nav.contains(e.target)) {
                props.setDisplayNavMobile(false)
            }
        });
    }, [])


    return (
        <>
            <div id="nav-bg" className={`nav-bg ${props.dispalyNavMobile && 'nav-bg-active'}`}></div>
            <div id="navBar" className={`nav ${props.dispalyNav && 'nav-change'} ${props.dispalyNavMobile ? 'nav-active-mobile' : 'nav-active-mobile-close'}`}>
                <div className="nav-head">
                    <img src={'/assets/logo/logo.jpg'} className="nav-head-logo" alt="logo" />
                    {props.dispalyNav ?
                        <div className="nav-head-circle-icon " onClick={props.ChangeDisplayNav} />
                        :
                        <img src="/assets/svg/dot.svg" className="nav-head-circle-icon nav-head-circle-icon-dot " onClick={props.ChangeDisplayNav} >
                            
                        </img>
                    }
                    <img src="/assets/svg/align.svg" onClick={props.ChangeDisplayNavMobile} className="nav-head-align-icon" />
                </div>
                {/* <div className="nav-head-bottom"></div> */}
                <div className="nav-profile">
                    <div className="nav-profile-head">
                        <img className="nav-profile-img" src={'/assets/media/admin.png'} alt="profile" />
                        <span>{localStorage.getItem('username')}</span>
                    </div>
                    <div className="nav-profile-icon">
                        <div className="nav-profile-icon-item">
                            <img src='/assets/svg/bell.svg' />
                        </div>
                        <div className="nav-profile-icon-item">
                            <img src='/assets/svg/user.svg' />
                        </div>
                    </div>
                </div>
                <div className="nav-cont">
                    {NavData.map((item, index) =>
                        <div onClick={() => { setActiveItem(index) }} className={`nav-cont-item ${activeItem == index && "nav-cont-item-active"}`}>
                            <div className="nav-cont-item-inner">
                                {item.isSubmenu ?
                                    <>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </>
                                    :
                                    <Link to={String(item.link)}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                }
                            </div>
                            {item.isSubmenu == true &&
                                <div className="nav-cont-item-submenu">
                                    {item.submenu && item.submenu.map(items =>
                                        <Link to={items.link}>
                                            <div className="nav-cont-item-submenu-item">
                                                {items.icon}
                                                <span>{items.name}</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            }
                        </div>
                    )}
                    <div className={`nav-cont-item`}>
                        <div onClick={Logout} className="nav-cont-item-inner">
                            <img src="/assets/svg/logout.svg" />
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;
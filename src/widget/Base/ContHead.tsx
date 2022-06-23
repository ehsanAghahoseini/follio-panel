import React, { useEffect, useState } from "react";
import AdminPro from '../../static/img/admin.png'
import { Link } from 'react-router-dom';

function ContHead(props: any) {

    return (
        <div className={`cont-head ${props.dispalyNavMobile && 'cont-head-hide'}`}>
            <div className="cont-head-right">
                <img src={'/assets/logo/logo.jpg'} alt="logo" />
            </div>
            <div className="cont-head-left">
                <div className="cont-head-left-align">
                    <img src="/assets/svg/align.svg" onClick={props.setDisplayNavMobile} className="cont-head-left-align-svg" />
                </div>
            </div>
        </div>
    )
}

export default ContHead;
import React, { useState, useEffect , useContext} from "react";
import Dashboard from "../../pages/Dashboard";
import Nav from "../Nav/Nav";
import ContHead from './ContHead'
import { Routes, Route } from "react-router-dom";
import {ContextState} from '../../widget/context/index'

function Base(props: any) {
    const [dispalyNav, setDisplayNav] = useState(true);
    const [dispalyNavMobile, setDisplayNavMobile] = useState(false);
    const Ctx = useContext(ContextState);


    const ChangeDisplayNav = () => {
        if (dispalyNav) {
            setDisplayNav(false)
        } else {
            setDisplayNav(true)
        }
    }


    const ChangeDisplayNavMobile = () => {
        if (dispalyNavMobile) {
            setDisplayNavMobile(false)
        } else {
            setDisplayNavMobile(true)
        }
    }


    // useEffect(()=>{
    //     props.history.listen((location:any, action:any) => {
    //         setDisplayNavMobile(false)
    //       });
    // },[])



    useEffect(() => {
        if (window.innerWidth < 991) {
            setDisplayNav(false)
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth < 991) {
                setDisplayNav(false)
            }
        });
    }, [])






    return (
        <div className="main">
            <div className={`cont ${dispalyNav && 'cont-change'}`} >
                <div className="cont-inner" >
                    <ContHead dispalyNavMobile={dispalyNavMobile} setDisplayNavMobile={setDisplayNavMobile} />
                    <div className="cont-inner-main">
                        <div className="cont-inner-main-head">
                            <h1>{Ctx.pageTitle.name}</h1>
                            <span>{Ctx.pageTitle.rout}</span>
                        </div>
                        {props.children}
                        <Routes>
                            <Route path="" element={<Dashboard />} />
                        </Routes>

                    </div>
                </div>
            </div>
            <Nav setDisplayNavMobile={setDisplayNavMobile} ChangeDisplayNavMobile={ChangeDisplayNavMobile} dispalyNavMobile={dispalyNavMobile} dispalyNav={dispalyNav} ChangeDisplayNav={ChangeDisplayNav} />
        </div>
    )
}

export default Base;
import React, { useState, useEffect , useContext} from "react";
import {ContextState} from '../../widget/context/index'


function Dashboard(props: any) {
    const Ctx = useContext(ContextState);

    useEffect(()=>{
        Ctx.setPageTitle({
            'name':"Dashboard" ,
            'rout':"Today's > state"
        })
    },)

    return (
        <div className=" w-full h-[200px] bg-follio-200"></div>
    )
}

export default Dashboard;
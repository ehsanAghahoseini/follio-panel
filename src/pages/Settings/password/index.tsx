import React, { useState, useEffect, useContext } from "react";
import { Users_Api } from "../../../widget/api/users-api";
import { ContextState } from '../../../widget/context/index'
import { toast } from "react-toastify";
import TablePage from "../../../widget/Table/TablePage";
import { Get_UserName_Api, Password_Update_Api } from "../../../widget/api/setting-api";
import CModal from "../../../widget/CModal/CModal";
import BtnLoader from "../../../widget/Base/BtnLoader";

function Plans(props: any) {
    const [displayPas, setDisplayPas] = useState(false)
    const [displayBtn, setDisplayBtn] = useState(false)
    const [username, setUserName] = useState(null)
    const Ctx = useContext(ContextState);


    const onFinish = async (e: any) => {
        e.preventDefault()
        if (e.target[0].value != e.target[1].value) {
            return toast('Password does not match', { type: "error" })
        }
        setDisplayBtn(true)
        const req = await Password_Update_Api(e, username)
        setDisplayBtn(false)
        if (req.status == true) {
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }


    const getData = async () => {
        Ctx.setPageLoading(true)
        const req = await Get_UserName_Api()
        Ctx.setPageLoading(false)
        setUserName(req.username)
    }

    useEffect(() => {
        getData()
        Ctx.setPageTitle({
            'name': "Setting",
            'rout': "Setting > edit password"
        })
    }, [])

    return (
        <>
            <div className=" w-full flex flex-wrap">
                <form onSubmit={onFinish} className='w-full md:w-6/12 p-[20px] bg-white shadow rounded-xl flex flex-col items-center overflow-hidden'>

                    <div className=" w-full flex items-center h-[50px] border rounded pr-2 relative">
                        <span className=" absolute text-sm text-gray-400 bg-white top-[-10px] left-3 px-2">New Password</span>
                        <input type={displayPas ? 'text' : 'password'} className=" w-[calc(100%-30px)] h-[40px] focus:outline-none px-[10px]" required/>
                        <div onClick={() => { setDisplayPas(!displayPas) }} className=" w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                            <img src="/assets/svg/eye.svg" className=" w-[20px]" />
                        </div>
                    </div>

                    <div className=" w-full mt-[20px] flex items-center h-[50px] border rounded pr-2 relative">
                        <span className=" absolute text-sm text-gray-400 bg-white top-[-10px] left-3 px-2">Confirm Password</span>
                        <input type={displayPas ? 'text' : 'password'} className=" w-[calc(100%-30px)] h-[40px] focus:outline-none px-[10px]" required/>
                        <div onClick={() => { setDisplayPas(!displayPas) }} className=" w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                            <img src="/assets/svg/eye.svg" className=" w-[20px]" />
                        </div>
                    </div>

                    {displayBtn == false ?
                        <button className=" w-full h-[40px] mt-[20px] text-white border-0 rounded bg-follio-200">Change Password</button>
                        :
                        <button className=" w-full h-[40px] mt-[20px] text-white border-0 rounded bg-follio-200 flex justify-center items-center"><BtnLoader/></button>
                    }
                </form>
            </div>
        </>
    )
}

export default Plans;
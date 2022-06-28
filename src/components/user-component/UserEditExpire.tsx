import React, { useState, useEffect, useContext } from "react";
import { ContextState } from '../../widget/context/index'
import { toast } from "react-toastify";
import CModal from "../../widget/CModal/CModal";
import { User_Update_Expire_Time } from "../../widget/api/users-api";

export declare type UserEditExpireProps = {
    visible : boolean 
    setVisible: (text:boolean) => void
    clearData:() => void
    selectItem:any 
    getData:(num:number) => void
    currentPage:number
}

function UserEditExpire({visible , setVisible , clearData , selectItem , getData , currentPage}:UserEditExpireProps) {
    const Ctx = useContext(ContextState);

    const onFinish=async(e:any)=>{
        e.preventDefault()
        Ctx.setPageLoading(false)
        const req = await User_Update_Expire_Time(selectItem , e)
        Ctx.setPageLoading(false)
        setVisible(false)
        if (req.status == true) {
            getData(currentPage)
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    return (
        <>
            <CModal onScap={clearData}  visible={visible} setVisible={setVisible} radius="30px" uId="editexpire" title="Edit expire date" >
                <form id="f-edit-user-expire" onSubmit={onFinish} className="w-full flex flex-col p-3">
                    <input type={'date'} className=" w-full h-[40px] px-[10px] rounded border focus:outline-none" placeholder="Select time" />
                    <button className="my-[20px] h-[40px] rounded text-white bg-follio-200">Update</button>
                </form>
            </CModal>
        </>
    )
}

export default UserEditExpire;
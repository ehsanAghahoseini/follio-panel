import React, { useState, useEffect, useContext } from "react";
import { ContextState } from '../../widget/context/index'
import { toast } from "react-toastify";
import CModal from "../../widget/CModal/CModal";
import { User_Update_Domain } from "../../widget/api/users-api";
import BtnLoader from "../../widget/Base/BtnLoader";
import { Whois_Domain_Api } from "../../widget/api/users-api";

export declare type UserEditDomainProps = {
    visible: boolean
    setVisible: (text: boolean) => void
    selectItem: any
    getData: (num: number) => void
    currentPage: number
}

function UserEditDomain({ visible, setVisible, selectItem, getData, currentPage }: UserEditDomainProps) {
    const Ctx = useContext(ContextState);
    const [domainName, setDomainName] = useState<any>(null);
    const [isFree, setIsFree] = useState<number>(0)
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)

    const clearData=()=>{
        let form3: any = document.getElementById('f-edit-user-domain')
        form3?.reset()
        setVisible(false)
        setDomainName(null)
        setIsFree(0)
    }

    const checkFreeDomain = async () => {
        setIsFree(0)
        if (domainName != null) {
            if (domainName.length < 5) {
                return toast('The domain must be at least 5 characters', { type: "error" })
            }
            Ctx.setPageLoading(true)
            const req = await Whois_Domain_Api(domainName)
            Ctx.setPageLoading(false)
            if (req.status == false) {
                setIsFree(-1)
                toast(req.message, { type: "error" })
            }
            else {
                toast(req.message, { type: "success" })
                setIsFree(1)
            }
        }
    }

    const onFinish = async (e: any) => {
        e.preventDefault()
        setDisplayBtn(true)
        const req = await User_Update_Domain(selectItem, domainName)
        setDisplayBtn(false)
        setVisible(false)
        if (req.status == true) {
            clearData()
            getData(currentPage)
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    return (
        <>
            <CModal onScap={clearData} visible={visible} setVisible={setVisible} radius="30px" uId="editdomainuser" title="Edit domain " >
                <form id="f-edit-user-domain" onSubmit={onFinish} className="w-full flex flex-col p-3">
                    <div className=" w-full h-[40px] flex rounded border overflow-hidden" >
                        <div onClick={checkFreeDomain} className=" w-[40px] h-[40px] flex justify-center items-center ">
                            <svg x="0px" y="0px" viewBox="0 0 492.145 492.145" className={` w-4 fill-gray-400 transition-all  cursor-pointer `}>
                                <use xlinkHref="/assets/svg/search.svg#search" />
                            </svg>
                        </div>
                        <input onChange={(e: any) => { setDomainName(e.target.value); setIsFree(0) }} value={domainName} type={'text'} className=" w-[calc(100%-40px)] h-[40px] px-[10px]  focus:outline-none" placeholder="Search domain" />

                    </div>
                    {isFree == 0 &&
                        <span className=" text-gray-500 text-lg m-3">{domainName}.follio.com  </span>
                    }
                    {isFree == 1 &&
                        <span className=" text-green-600 text-lg m-3">{domainName}.follio.com  free </span>
                    }
                    {isFree == -1 &&
                        < span className=" text-red-600 text-lg m-3">{domainName}.follio.com reserved </span>
                    }
                    {isFree == 1 &&
                        <>
                            {displayBtn == true ?
                                <button className='w-full h-[45px] rounded shadow bg-follio-200 text-white mt-[10px] mb-[20px] font-bold relative flex justify-center items-center'><BtnLoader /></button>
                                :
                                <button className='w-full h-[45px] rounded shadow bg-follio-200 text-white mt-[10px] mb-[20px] font-bold'>Update</button>
                            }
                        </>
                    }
                </form>
            </CModal>
        </>
    )
}

export default UserEditDomain;
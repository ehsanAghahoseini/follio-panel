import React, { useState, useEffect, useContext } from "react";
import { Dashboard_Api } from "../../widget/api/dashboard-api";
import { ContextState } from '../../widget/context/index'
import { toast } from "react-toastify";

function Dashboard(props: any) {
    const Ctx = useContext(ContextState);
    const [listData, setListData] = useState<any>(null);


    const getData = async () => {
        Ctx.setPageLoading(true)
        const req = await Dashboard_Api()
        Ctx.setPageLoading(false)
        if (req.data) {
            setListData(req.data)
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    useEffect(() => {
        getData()
        Ctx.setPageTitle({
            'name': "Dashboard",
            'rout': "Today's > state"
        })
    }, [])

    return (
        <div className=" w-full flex flex-wrap">

            <div className=" w-full lg:w-6/2 sm:w-3/12 p-[5px]"  >
                <div className=" w-full  min-h-[100px] py-[15px] bg-white shadow rounded-[20px] flex flex-col justify-center items-center">
                    <div className=" w-[50px] h-[50px] rounded-full border border-follio-200 flex justify-center items-center">
                        <svg x="0px" y="0px" viewBox="0 0 490.1 490.1" className={` w-6 fill-follio-200 transition-all   `}>
                            <use xlinkHref="/assets/svg/user2.svg#user" />
                        </svg>
                    </div>
                    <span className=" my-[10px] text-sm text-follio-100">Users Count</span>
                    <span className=" text-follio-200 ">{listData?.usersCount}</span>
                </div>
            </div>

            <div className=" w-full lg:w-6/2 sm:w-3/12 p-[5px]"  >
                <div className=" w-full  min-h-[100px] py-[15px] bg-white shadow rounded-[20px] flex flex-col justify-center items-center">
                    <div className=" w-[50px] h-[50px] rounded-full border border-follio-200 flex justify-center items-center">
                        <svg x="0px" y="0px" viewBox="-351 153 256 256" className={` w-6 fill-follio-200 transition-all   `}>
                            <use xlinkHref="/assets/svg/content.svg#content" />
                        </svg>
                    </div>
                    <span className=" my-[10px] text-sm text-follio-100">Content Count</span>
                    <span className=" text-follio-200 ">{listData?.contentCount}</span>
                </div>
            </div>

            <div className=" w-full lg:w-6/2 sm:w-3/12 p-[5px]"  >
                <div className=" w-full  min-h-[100px] py-[15px] bg-white shadow rounded-[20px] flex flex-col justify-center items-center">
                    <div className=" w-[50px] h-[50px] rounded-full border border-follio-200 flex justify-center items-center">
                        <svg x="0px" y="0px" viewBox="0 0 501.991 501.991" className={` w-6 fill-follio-200 transition-all   `}>
                            <use xlinkHref="/assets/svg/link.svg#link" />
                        </svg>
                    </div>
                    <span className=" my-[10px] text-sm text-follio-100">Hotlink Count</span>
                    <span className=" text-follio-200 ">{listData?.hotlinkCount}</span>
                </div>
            </div>

            <div className=" w-full lg:w-6/2 sm:w-3/12 p-[5px]"  >
                <div className=" w-full  min-h-[100px] py-[15px] bg-white shadow rounded-[20px] flex flex-col justify-center items-center">
                    <div className=" w-[50px] h-[50px] rounded-full border border-follio-200 flex justify-center items-center">
                        <svg x="0px" y="0px" viewBox="0 0 490 490" className={` w-6 fill-follio-200 transition-all   `}>
                            <use xlinkHref="/assets/svg/box.svg#box" />
                        </svg>
                    </div>
                    <span className=" my-[10px] text-sm text-follio-100">Product Count</span>
                    <span className=" text-follio-200 ">{listData?.productCount}</span>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
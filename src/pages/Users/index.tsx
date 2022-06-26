import React, { useState, useEffect, useContext } from "react";
import { Users_Api } from "../../widget/api/users-api";
import { ContextState } from '../../widget/context/index'
import { toast } from "react-toastify";
import TablePage from "../../widget/Table/TablePage";

function UsersList(props: any) {
    const Ctx = useContext(ContextState);
    const [listData, setListData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const handelRedirect=(id:number)=>{
        console.log(id);
        // Ctx.setPageLoading(true)
        
    }

    const changePage = (status: any) => {
        if (status) {
            if (lastPage >= currentPage + 1) {
                getData(currentPage + 1)
            }
        }
        else {
            if (currentPage > 1) {
                getData(currentPage - 1)
            }
        }
    }

    const col = [
        {
            title: "id",
            render: (i: any) => (<>{i.id != null && i.id}</>)
        },
        {
            title: "Username",
            render: (i: any) => (<>{i.username != null && i.username}</>)
        },
        {
            title: "Name",
            render: (i: any) => (<>{i.name != null && i.name}</>)
        },
        {
            title: "Domain",
            render: (i: any) => (<>{i.domain != null && i.domain}</>)
        },
        {
            title: "Verification step",
            render: (i: any) => (
                <>
                    {i.verification_step == 1 && <span className=" text-[#16BB83] font-bold">{`Step ${i.verification_step}`}</span>}
                    {i.verification_step == 2 && <span className=" text-[#FF3A44] font-bold">{`Step ${i.verification_step}`}</span>}
                    {i.verification_step == 3 && <span className=" text-[#FFA500] font-bold">{`Step ${i.verification_step}`}</span>}
                    {i.verification_step == 4 && <span className=" text-[#9dd3c1] font-bold">{`Step ${i.verification_step}`}</span>}
                    {i.verification_step > 4 && <span className=" text-[#c57fda] font-bold">{`Step ${i.verification_step}`}</span>}

                </>
            )
        },
        {
            title: "Login as admin",
            render: (i: any) => (
                <div onClick={()=>handelRedirect(i.id)} className=" px-3 h-[30px] rounded flex justify-center items-center bg-[#FF3A44] text-white">
                    <span>Redirect</span>
                    <img src="/assets/svg/redirect.svg" className="w-[20px] mx-[10px]" />
                </div>
            )
        },

    ]

    const getData = async (currentPage: number) => {
        Ctx.setPageLoading(true)
        const req = await Users_Api(currentPage)
        Ctx.setPageLoading(false)
        if (req.data.users) {
            setListData(req.data.users.data)
            setCurrentPage(req.data.users.current_page)
            setLastPage(req.data.users.last_page)
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    useEffect(() => {
        getData(currentPage)
        Ctx.setPageTitle({
            'name': "Users",
            'rout': "Users > list"
        })
    }, [])

    return (
        <div className=" w-full flex flex-wrap">

            <TablePage columns={col} data={listData}>
                {currentPage != 1 &&
                    <div className="table-counter-main-item" onClick={() => changePage(false)} >
                        <svg x="0px" y="0px" viewBox="0 0 24 24" className={` w-4 h-4 fill-glasses-head-50 transition-all  `}>
                            <use xlinkHref="/assets/svg/arrow-left.svg#arrow-left" />
                        </svg>
                    </div>
                }
                <div className="table-counter-main-item">{currentPage} </div>
                {lastPage >= currentPage + 1 &&
                    <div className="table-counter-main-item" onClick={() => changePage(true)} >
                        <svg x="0px" y="0px" viewBox="0 0 24 24" className={` w-4 h-4 fill-glasses-head-50 transition-all  `}>
                            <use xlinkHref="/assets/svg/arrow-right.svg#arrow-right" />
                        </svg>
                    </div>
                }
            </TablePage>

        </div>
    )
}

export default UsersList;
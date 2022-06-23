import React, { useState, useEffect, useContext } from "react";
import { Users_Api } from "../../widget/api/users-api";
import { ContextState } from '../../widget/context/index'
import { toast } from "react-toastify";
import TablePage from "../../widget/Table/TablePage";
import { Plans_Api, Plans_Delete_Api, Plans_Edit_Api , Plans_Add_Api } from "../../widget/api/plans-api";
import CModal from "../../widget/CModal/CModal";
import BtnLoader from "../../widget/Base/BtnLoader";

function Plans(props: any) {
    const Ctx = useContext(ContextState);
    const [listData, setListData] = useState<any>([]);
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [visibleDelete, setVisibleDelete] = useState<boolean>(false)
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false)
    const [visibleAdd, setVisibleAdd] = useState<boolean>(false)
    const [selectItem, setSelectItem] = useState<any>(null)

    const clearData = () => {
        setVisibleDelete(false)
        setVisibleEdit(false)
        setVisibleAdd(false)
        setSelectItem(null)
        Ctx.setPageLoading(false)
    }

    const changeData = (key: string, value: number) => {
        let data = { ...selectItem };
        data[key] = value;
        setSelectItem(data)
    }

    const onFinishAdd=async(e:any)=>{
        e.preventDefault()
        setDisplayBtn(true)
        console.log(e);
        
        const req = await Plans_Add_Api(e)
        setDisplayBtn(false)
        if (req.status == true) {
            getData()
            clearData()
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    const startEdit = (item: any) => {
        setSelectItem(item)
        setVisibleEdit(true)
    }

    const onFinishEdit = async () => {
        setDisplayBtn(true)
        const req = await Plans_Edit_Api(selectItem)
        setDisplayBtn(false)
        if (req.status == true) {
            getData()
            clearData()
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    const startDelete = (item: any) => {
        setSelectItem(item)
        setVisibleDelete(true)
    }

    const onFinishDelete = async () => {
        Ctx.setPageLoading(true)
        const req = await Plans_Delete_Api(selectItem.id)
        Ctx.setPageLoading(false)
        if (req.status == true) {
            getData()
            clearData()
            toast(req.message, { type: "success" })
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    const getData = async () => {
        Ctx.setPageLoading(true)
        const req = await Plans_Api()
        Ctx.setPageLoading(false)
        if (req.data) {
            setListData(req.data.plans)
        }
        else if (req.message) {
            toast(req.message, { type: "error" })
        }
    }

    useEffect(() => {
        getData()
        Ctx.setPageTitle({
            'name': "Plans",
            'rout': "Plans > list"
        })
    }, [])

    return (
        <>
            <div className=" w-full flex flex-wrap">
                <div className=" w-full mb-[20px] flex items-center">
                    <div onClick={()=>{setVisibleAdd(true)}} className=" px-[10px] h-[45px] bg-follio-200 flex justify-center items-center rounded-[30px] text-white cursor-pointer">
                        + Add new plan
                    </div>
                </div>
                {listData.map((item: any, index: any) =>
                    <div key={index} className=' lg:w-3/12 sm:w-4/12 w-full p-[10px]  flex flex-col items-center relative cursor-pointer transition-all hover:mt-[-3px] overflow-hidden'>
                        <div className=' w-[80px] h-[80px] ct-bg-1 z-10 rounded-full flex justify-center items-center p-[2px] mb-[-40px]'>
                            <div className=' w-full h-full flex justify-center items-center bg-white rounded-full p-[2px]'>
                                <img src={'/assets/svg/plans.svg'} alt='logo' className='w-[40px]' />
                            </div>
                        </div>
                        <div className='w-full pt-[50px] pb-[20px] bg-white shadow rounded-xl flex flex-col items-center overflow-hidden border-t-2 border-follio-200'>
                            <div className=' w-full flex flex-col px-[20px]'>
                                <div className=" flex full items-center text-sm mx-[5px] text-gray-500">
                                    id : {item.id}
                                </div>
                                <div className=" flex full items-center text-sm mx-[5px] text-gray-500">
                                    cost : {item.cost}
                                </div>
                                <div className=" flex full items-center text-sm mx-[5px] text-gray-500">
                                    duration : {item.duration}
                                </div>
                            </div>
                            <div className=" flex items-center mt-[20px]">
                                <button onClick={() => startEdit(item)} className=' h-[40px] w-[40px] mx-[5px] border rounded-md border-follio-200 text-follio-200 px-[10px]'>
                                    <svg x="0px" y="0px" viewBox="0 0 469.331 469.331" className={` w-4 fill-follio-200 transition-all   `}>
                                        <use xlinkHref="/assets/svg/edit.svg#edits" />
                                    </svg>
                                </button>
                                <button onClick={() => startDelete(item)} className=' h-[40px] w-[40px] mx-[5px] border rounded-md border-follio-200 text-follio-200 px-[10px]'>
                                    <svg x="0px" y="0px" viewBox="0 0 458.5 458.5" className={` w-4 fill-follio-200 transition-all   `}>
                                        <use xlinkHref="/assets/svg/trash.svg#trashh" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CModal onScap={clearData} visible={visibleDelete} setVisible={setVisibleDelete} radius="30px" uId="deleteplans">
                <div className="w-full flex flex-col p-3">
                    <span>Are you sure delete plans ?</span>
                    <div className=" flex mt-[30px] items-center justify-around">
                        <button onClick={onFinishDelete} type="button" className="w-[120px] h-[40px] rounded-[30px] bg-follio-200 text-white ">Ok</button>
                        <button onClick={clearData} type="button" className="w-[120px] h-[40px] rounded-[30px] border border-follio-200 text-follio-200 ">Cansel</button>
                    </div>
                </div>
            </CModal>

            <CModal onScap={clearData} visible={visibleEdit} setVisible={setVisibleEdit} radius="30px" uId="editplans">
                {selectItem != null &&
                    <form className="w-full flex flex-col p-3">
                        <div className="w-full flex flex-col my-[10px] ">
                            <span className="text-sm text-follio-200">Cost</span>
                            <input placeholder="Cost" onChange={(e: any) => changeData('cost', e.target.value)} value={selectItem.cost} type={'number'} className="w-full h-[40px] border-b-2 border-follio-200 focus:outline-none" required/>
                        </div>
                        <div className="w-full flex flex-col my-[10px] ">
                            <span className="text-sm text-follio-200">Duration</span>
                            <input placeholder="duration" onChange={(e: any) => changeData('duration', e.target.value)} value={selectItem.duration} type={'number'} className="w-full h-[40px] border-b-2 border-follio-200 focus:outline-none" required/>
                        </div>
                        {displayBtn == false ?
                            <button onClick={onFinishEdit} type="submit" className="w-[120px] h-[40px] rounded-[30px] bg-follio-200 text-white ">Ok</button>
                            :
                            <button type="button" className="w-[120px] h-[40px] rounded-[30px] bg-follio-200 text-white relative flex justify-center items-center"><BtnLoader /></button>
                        }
                    </form>
                }
            </CModal>

            <CModal onScap={clearData} visible={visibleAdd} setVisible={setVisibleAdd} radius="30px" uId="addsplans">
                <form onSubmit={onFinishAdd} className="w-full flex flex-col p-3">
                    <div className="w-full flex flex-col my-[10px] ">
                        <span className="text-sm text-follio-200">Cost</span>
                        <input placeholder="Cost" type={'number'} className="w-full h-[40px] border-b-2 border-follio-200 focus:outline-none" required/>
                    </div>
                    <div className="w-full flex flex-col my-[10px] ">
                        <span className="text-sm text-follio-200">Duration</span>
                        <input placeholder="duration" type={'number'} className="w-full h-[40px] border-b-2 border-follio-200 focus:outline-none" required/>
                    </div>
                    {displayBtn == false ?
                        <button  type="submit" className="w-[120px] h-[40px] rounded-[30px] bg-follio-200 text-white ">Ok</button>
                        :
                        <button type="button" className="w-[120px] h-[40px] rounded-[30px] bg-follio-200 text-white relative flex justify-center items-center"><BtnLoader /></button>
                    }
                </form>
            </CModal>

        </>
    )
}

export default Plans;
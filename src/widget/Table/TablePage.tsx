
import React, { useEffect, useState }  from "react" ;



function TablePage(props:any) {
    const [listData , setListData] = useState([]);
    const [counter , setCounter] = useState(1);
    const[sortState , setSortState]=useState(true);


    const sortList=async(sort:any)=>{
        await setSortState(!sortState)
        if(sortState){
            await setListData(listData.sort((a, b) => (a[sort] > b[sort]) ? 1 : -1))
            await setSortState(false)
        }
        else {
            await setListData(listData.sort((a, b) => (a[sort] < b[sort]) ? 1 : -1))
            await setSortState(true)
        }
    }



    
    useEffect(() => {
        if(props.data){
            setListData(props.data)
        }
    },[props.data]);

    return (
        <div className="table">
            <div className="table-head">
                {props.columns.map((item:any)=>
                    <div className="table-head-item">
                        <span>{item.title}</span>
                        {item.sort != null && item.sort != undefined &&
                            <span onClick={()=>sortList(item.sort)}  >+</span>
                        }
                    </div>
                )}
            </div>
            {listData.map(item=>
            <div className="table-row">
                    {props.columns.map((items:any)=>
                    <div className="table-row-item">
                        {item[items.dataIndex]}
                        {item[items.dataIndex] == undefined && items.render(item)}
                    </div>
                    )}
            </div>
            )}
            <div className="table-counter">
                <div className="table-counter-main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default TablePage;
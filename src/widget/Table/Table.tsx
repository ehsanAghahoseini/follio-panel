
import React, { useEffect, useState }  from "react" ;


function Table(props:any) {
    const [listData , setListData] = useState<any>([]);
    const [counter , setCounter] = useState(1);
    const [range , setRange] = useState(10);
    const[sortState , setSortState]=useState(true);


    const sortList=async(sort:any)=>{
        await setSortState(!sortState)
        if(sortState){
            await setListData(listData.sort((a:any, b:any) => (a[sort] > b[sort]) ? 1 : -1))
            await setSortState(false)
        }
        else {
            await setListData(listData.sort((a:any, b:any) => (a[sort] < b[sort]) ? 1 : -1))
            await setSortState(true)
        }
    }


    const changeCounter=(action:any)=>{
        let newlist = [] ;
        if(action){
            if(props.data[(counter * range)] != undefined){
                for(let i=counter * range ; i<(counter * range)+range ; i++){
                    if(props.data[i] != undefined){
                        newlist.push(props.data[i])
                    }
                }
                setCounter(counter + 1)
                setListData(newlist);
                return ;
            }
        }
        else {
            if(props.data[((counter -1 ) * range)-1] != undefined){
                for(let i=(counter - 2)*range ; i<((counter - 2)*range)+range ; i++){
                    if(props.data[i] != undefined){
                        newlist.push(props.data[i])
                    }
                }
                setCounter(counter - 1)
                setListData(newlist);
                return ;
            }
        }

    }

    
    useEffect(() => {
        let list = [] ;
        setRange(props.range)
        for(let i=0 ; i<range ; i++){
            if(props.data[i] != undefined){
                list.push(props.data[i])
            }
        }
        setCounter(1)
        setListData(list)
    },[props.data , props.range]);

    return (
        <div className="table">
            <div className="table-head">
                {props.columns.map((item:any , index:any)=>
                    <div key={index} className="table-head-item">
                        <span>{item.title}</span>
                        {item.sort != null && item.sort != undefined &&
                            <span onClick={()=>sortList(item.sort)}  />
                        }
                    </div>
                )}
            </div>
            {listData.map((item:any , index:any)=>
            <div key={index} className="table-row">
                    {props.columns.map((items:any , indexes:any)=>
                    <div key={indexes} className="table-row-item">
                        {item[items.dataIndex]}
                        {item[items.dataIndex] == undefined && items.render(item)}
                    </div>
                    )}
            </div>
            )}
            <div className="table-counter">
                <div className="table-counter-main">
                    <div className="table-counter-main-item" onClick={()=>changeCounter(false)} ><span  /> left</div>
                    <div className="table-counter-main-item"> {counter} </div>
                    <div className="table-counter-main-item" onClick={()=>changeCounter(true)}><span >right</span></div>
                </div>
            </div>
        </div>
    )
}

export default Table;
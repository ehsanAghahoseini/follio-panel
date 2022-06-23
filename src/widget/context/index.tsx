import React, { useEffect, useState } from 'react'

export const ContextState = React.createContext<any>({})


export default function ContextMain(props: any) {
    const [pageLoading, setPageLoading] = useState<boolean>(false)
    const [pageTitle, setPageTitle] = useState<any>({
        'name':"" ,
        'rout':""
    })

    return (
        <ContextState.Provider value={{
            pageTitle ,
            setPageTitle ,
            pageLoading ,
            setPageLoading ,

        }}>
            {props.children}
        </ContextState.Provider>
    )
}
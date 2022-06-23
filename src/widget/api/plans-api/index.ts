import { customApi, baseUrl } from "../index";


export const Plans_Api = async () => {
    return await customApi({ url: `${baseUrl}/admin/plans` }, { method: "GET", token: true })
}


export const Plans_Delete_Api = async (id: number) => {
    return await customApi({ url: `${baseUrl}/admin/plans/${id}` }, { method: "DELETE", token: true })
}

export const Plans_Edit_Api = async (item: any) => {
    const postData = JSON.stringify({
        "cost": item.cost,
        "duration": item.duration
    })
    return await customApi({ url: `${baseUrl}/admin/plans/${item.id}` }, { method: "PUT", token: true , body:postData })
}


export const Plans_Add_Api = async (e: any) => {
    const postData = JSON.stringify({
        "cost": e.target[0].value,
        "duration":e.target[1].value
    })
    return await customApi({ url: `${baseUrl}/admin/plans` }, { method: "POST", token: true , body:postData })
}


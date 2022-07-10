import { customApi, baseUrl } from "../index";


export const Get_UserName_Api = async () => {
    return await customApi({ url: `${baseUrl}/admin/profile` }, { method: "GET", token: true })
}


export const Password_Update_Api = async (e: any , username:any) => {
    const postData = JSON.stringify({
        "username": username,
        "password":e.target[0].value
    })
    return await customApi({ url: `${baseUrl}/admin/profile` }, { method: "PUT", token: true , body:postData })
}


export const Username_Update_Api = async (username:any) => {
    const postData = JSON.stringify({
        "username": username,
    })
    return await customApi({ url: `${baseUrl}/admin/profile` }, { method: "PUT", token: true , body:postData })
}


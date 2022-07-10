import { customApi, baseUrl } from "../index";


export const Get_UserName_Api = async () => {
    return await customApi({ url: `${baseUrl}/admin/profile` }, { method: "GET", token: true })
}


export const Password_Update_Api = async (password: any , username:any) => {
    const postData = JSON.stringify({
        "username": username,
        "password":password
    })
    return await customApi({ url: `${baseUrl}/admin/profile` }, { method: "PUT", token: true , body:postData })
}

import { customApi, baseUrl } from "../index";


export const Users_Api = async (page:number) => {
    return await customApi({ url: `${baseUrl}/admin/users?page=${page}` }, { method: "GET" , token:true})
}

export const User_Redirect_Api = async (id:number) => {
    return await customApi({ url: `${baseUrl}/admin/users/login-as/${id}` }, { method: "GET" , token:true})
}

export const User_Delete_Api = async (id: number) => {
    return await customApi({ url: `${baseUrl}/admin/users/${id}` }, { method: "DELETE", token: true })
}
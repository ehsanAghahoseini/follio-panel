import { customApi, baseUrl } from "../index";


export const Users_Api = async (page:number) => {
    return await customApi({ url: `${baseUrl}/admin/users?page=${page}` }, { method: "GET" , token:true})
}
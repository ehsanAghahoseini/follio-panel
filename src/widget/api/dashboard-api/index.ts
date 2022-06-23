import { customApi, baseUrl } from "../index";


export const Dashboard_Api = async () => {
    return await customApi({ url: `${baseUrl}/admin/dashboard` }, { method: "GET" , token:true})
}
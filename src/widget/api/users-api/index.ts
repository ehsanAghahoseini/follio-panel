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

export const User_Update_Expire_Time = async (id: number , e:any) => {
    const postData = JSON.stringify({
        "expire_date": e.target[0].value,
    })
    return await customApi({ url: `${baseUrl}/admin/users/${id}` }, { method: "PUT", token: true , body:postData })
}

export const User_Update_Domain = async (id: number , domain:string) => {
    const postData = JSON.stringify({
        "domain": domain,
    })
    return await customApi({ url: `${baseUrl}/admin/users/${id}` }, { method: "PUT", token: true , body:postData })
}

export const Whois_Domain_Api = async (domainName: string) => {
    let formData = new FormData()
    formData.append("domain", domainName);
    return await customApi({ url: `${baseUrl}/auth/whois-domain` }, { method: "POST", token: true, body: formData, formData: true })
}


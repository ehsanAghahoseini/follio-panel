import { toast } from "react-toastify";
// import LocalForage from "localforage"
import { ApiInputOptional, ApiInputRequired, GetCustomizedOrdersOptions } from "../types/api.types";

// this baseUrl is configed in next.config.js
export const baseUrl = "https://follio.moshtarimadar.com/api"


export async function getToken(): Promise<string | null> {
    return await `Bearer ${await localStorage.getItem("token")}`;
}


export async function customApi(required: Required<ApiInputRequired>, optional: Partial<ApiInputOptional>) {
    const init: RequestInit = {}
    const headers: HeadersInit = {}
    // if (optional.token) headers['token'] = await getToken() ?? ""
    if (optional.token) headers['Authorization'] = await getToken() ?? ""
    if (optional.method !== "GET") init.body = optional.body
    if (optional.formData) {        
        // headers['Content-Type'] = "multipart/form-data"
    }
    else {
        headers['Content-Type'] = "application/json"
        headers['Accept'] = "application/json"
    }
    init.headers = headers
    init.method = optional.method ?? "GET"
    if (!navigator.onLine) {
        toast("Internet Connection Lost", { type: "error" })
        // setTimeout(()=>{
        //     alert("Internet Connection Lost")
        //     return window.location.reload();
        // },1000)
    }
    const request = await fetch(required.url, init)
    const response = request.json();
    
    return response.then((res) => {
        if (res.ok) {
            toast(optional.successMes, optional.messageConfig = { type: "success" })
            return res
        } else {
            toast(res.msg, { type: "error" })
            toast(optional.errorMes, optional.messageConfig = { type: "error" })
            return res
        }
    })
        .catch((err) => {
            alert(`status err : ${err}`)
            toast(err, { type: "error", autoClose: false })
            return err
        })
}

export async function getCustomizedOrdersAPI(options: Partial<GetCustomizedOrdersOptions>): Promise<{ data: any, ok: boolean, msg: any }> {
    const status = options.status ? `status=${options.status}` : `status=5`
    const fa_date_start = options.fa_date_start ? `&fa_date_start=${options.fa_date_start}` : ``
    const fa_date_end = options.fa_date_end ? `&fa_date_end=${options.fa_date_end}` : ``
    const page = options.page ? `&page=${options.page}` : ``
    const today_orders = options.today_orders ? `&today_orders=${options.today_orders}` : ``
    const params = status.concat(fa_date_end).concat(fa_date_start).concat(page).concat(today_orders)

    const req = await customApi(
        { url: `${baseUrl}list-orders?${params}` },
        { method: "GET", token: true }
    )
    if (req.ok) return req
    else {
        toast(req.msg, { type: "error" })
        return req
    }
}
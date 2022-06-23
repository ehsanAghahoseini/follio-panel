import {ToastContent, ToastOptions} from "react-toastify/dist/types";

export declare type FetchMethode = "GET" | "POST" | "PUT" | "DELETE" | "UPDATE";
export declare type ApiInputRequired = {
    url: string,
}
export declare type ApiInputOptional = {
    body: any,
    token: boolean,
    formData?: boolean,
    method?: FetchMethode,
    successMes?: ToastContent,
    errorMes?: ToastContent,
    messageConfig?: ToastOptions<{}>,
    unexpectedMess?: ToastContent
}

// ------ GetCustomizedOrdersOptions
export declare type GetCustomizedOrdersOptions = {
        today_orders?: 0 | 1,
        status: any,
        fa_date_start?: string,
        fa_date_end?: string,
        page?: number,
    }

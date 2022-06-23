import { customApi, baseUrl } from "../index";


export const Login_Api = async (e: any) => {
    const postData = JSON.stringify({
        'username': e.target[0].value,
        'password': e.target[1].value,
    })
    return await customApi({ url: `${baseUrl}/auth/login` }, { method: "POST", body: postData })
}